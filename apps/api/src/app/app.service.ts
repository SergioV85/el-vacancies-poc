import { Injectable, HttpService } from '@nestjs/common';
import { stringify } from 'qs';
import { Observable, OperatorFunction } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import {
  anyPass,
  applySpec,
  drop,
  equals,
  isEmpty,
  isNil,
  map as ramdaMap,
  nth,
  pathOr,
  pipe,
  split,
  transpose,
  when,
  mergeRight,
} from 'ramda';
import { parseStringPromise } from 'xml2js';
import { Vacancy, VacancyDetails, ServiceNowPayload } from '@el/api-interfaces';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  public getVacancies(): Observable<Vacancy[]> {
    const referrer = 'joblist.do?lang=en';

    const payload = {
      x_referer: referrer,
      '0.sysparm_processor': 'getLocationJobs',
      '0.sysparm_name': 'Jobs',
      '0.sysparm_lang': 'en',
      '0.sysparm_job_loc': 'ALL',
    };
    return this.getDataFromServiceNow(payload, '', []).pipe(map(this.parseVacancies));
  }

  public getVacancy(id: string): Observable<VacancyDetails> {
    const referrr = `details.do?sysparm_document_key=x_inte3_recruit_request,${id}&lang=en`;

    const payload = {
      x_referer: referrr,
      '0.sysparm_sysId': id,
    };
    return this.getDataFromServiceNow(payload, '', []).pipe(map(this.parseVacancyDetails));
  }

  private getDataFromServiceNow(query: Partial<ServiceNowPayload>, token = '', cookies: []) {
    const payload = mergeRight(
      {
        sysparm_aggregation_size: 1,
        sysparm_processor: 'AJAXXMLHttpAggregator',
        '0.sysparm_scope': 'x_inte3_recruit',
      },
      query,
    );

    return this.authorizeOnServiceNow().pipe(
      switchMap(() =>
        this.httpService.post('https://elipslife.service-now.com/recruit/xmlhttp.do', stringify(payload), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-UserToken': token,
            withCredentials: true,
            Cookie: cookies.join(';'),
          },
        }),
      ),
      switchMap(({ data }) => parseStringPromise(data)),
      map(pathOr('', ['xml', 'xml', 0, '$', 'answer'])),
      catchError(err => {
        const { response } = err;
        if (response.status === 401) {
          const newToken = response.headers['x-usertoken-response'];
          const receivedCookies = response.headers['set-cookie'];
          return this.getDataFromServiceNow(payload, newToken, receivedCookies);
        }
        throw err;
      }),
    );
  }

  private authorizeOnServiceNow() {
    return this.httpService
      .post('https://elipslife.service-now.com/amb/handshake', {
        version: '1.0',
        minimumVersion: '1.0',
        channel: '/meta/handshake',
        supportedConnectionTypes: ['long-polling'],
        advice: {
          timeout: 60000,
          interval: 0,
        },
        id: '1',
      })
      .pipe(
        map(response => response.data),
        switchMap(([{ clientId }]) =>
          this.httpService.post('https://elipslife.service-now.com/amb/connect', {
            channel: '/meta/connect',
            connectionType: 'long-polling',
            id: '5',
            clientId,
          }),
        ),
      );
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

  private parseVacancyDetails(body: string): VacancyDetails {
    return {} as VacancyDetails;
  }
}
