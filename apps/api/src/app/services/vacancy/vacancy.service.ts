import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  anyPass,
  applySpec,
  drop,
  equals,
  isEmpty,
  isNil,
  map as ramdaMap,
  nth,
  pipe,
  split,
  transpose,
  when,
} from 'ramda';
import * as cheerio from 'cheerio';
import { Vacancy, VacancyDetails } from '@el/api-interfaces';
import { ServiceNowProxyService } from '../service-now-proxy/service-now-proxy.service';

@Injectable()
export class VacancyService {
  constructor(private readonly serviceNow: ServiceNowProxyService) {}

  public getVacancies(): Observable<Vacancy[]> {
    const referrer = 'joblist.do?lang=en';

    const payload = {
      x_referer: referrer,
      sysparm_aggregation_size: 1,
      '0.sysparm_scope': 'x_inte3_recruit',
      '0.sysparm_toggler': 1,
      '0.sysparm_processor': 'getLocationJobs',
      '0.sysparm_name': 'Jobs',
      '0.sysparm_lang': 'en',
      '0.sysparm_job_loc': 'ALL',
    };
    return this.serviceNow.getDataByPost(payload, false, '', []).pipe(map(this.parseVacancies));
  }

  public getVacancy(id: string): Observable<VacancyDetails> {
    const uri = `details.do?sysparm_document_key=x_inte3_recruit_request,${id}&lang=en`;

    return this.serviceNow.getRawDataByGet(uri).pipe(map(this.parseVacancyDetails));
  }
  private parseVacancies(vacancies: string): Vacancy[] {
    return pipe(
      split('|__|'),
      ramdaMap(split('-::-')),
      transpose,
      drop(1),
      ramdaMap(
        applySpec({
          name: nth(0),
          location: pipe(
            nth(1),
            when(anyPass([isNil, isEmpty, equals('undefined')]), () => 'any'),
          ),
          id: nth(2),
          country: pipe(
            nth(3),
            when(anyPass([isNil, isEmpty, equals('undefined')]), () => 'any'),
          ),
        }),
      ) as (data: string[][]) => Vacancy[],
    )(vacancies);
  }

  private parseVacancyDetails(html: string): VacancyDetails {
    const page = cheerio.load(html);
    page('.logo-container-print').remove();
    page('.detail-container h2').addClass('detail-container__title');
    page('.detail-container h2')
      .next()
      .addClass('detail-container__location');
    page('.detail-container > div > p').addClass('detail-container__paragraph');
    page('.detail-container > div:contains("Apply now")').remove();
    return {
      description: page('#print-content').html(),
    };
  }
}
