import { Injectable } from '@nestjs/common';
import { Observable, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  applySpec,
  concat,
  converge,
  curry,
  drop,
  equals,
  fromPairs,
  groupWith,
  head,
  last,
  length,
  map as ramdaMap,
  of,
  pipe,
  split,
  toLower,
  when,
} from 'ramda';
import { DictionaryItem, Dictionaries } from '@el/api-interfaces';
import { ServiceNowProxyService } from '../service-now-proxy/service-now-proxy.service';

@Injectable()
export class DictionariesService {
  constructor(private readonly serviceNow: ServiceNowProxyService) {}

  public getDictionariesForVacancy(jobId: string): Observable<Dictionaries> {
    const referrer = `applicant_form.do?sysparm_jobid=${jobId}&lang=en`;

    const payload = {
      sysparm_scope: 'global',
      x_referer: referrer,
      sysparm_aggregation_size: 5,
      '0.sysparm_processor': 'getAllCountries',
      '0.sysparm_name': 'getCountriesTranslated',
      '0.sysparm_lang': 'en',
      '0.sysparm_scope': 'x_inte3_recruit',
      '1.sysparm_processor': 'Recruit_getQuestionApplicantForm',
      '1.sysparm_name': 'Questions',
      '1.sysparm_lang': 'en',
      '1.sysparm_scope': 'x_inte3_recruit',
      '2.sysparm_processor': 'recruitPublic',
      '2.sysparm_name': 'getPrefixes',
      '2.sysparm_lang': 'en',
      '2.sysparm_scope': 'x_inte3_recruit',
      '3.sysparm_processor': 'recruitPublic',
      '3.sysparm_name': 'getWorkPermitsTr',
      '3.sysparm_lang': 'en',
      '3.sysparm_scope': 'x_inte3_recruit',
      '4.sysparm_processor': 'recruitPublic',
      '4.sysparm_name': 'getReferralSource',
      '4.sysparm_lang': 'en',
      '4.sysparm_scope': 'x_inte3_recruit',
    };
    const dictionariesNames = ['countries', 'questions', 'workPermits', 'referralSources'];
    return this.serviceNow
      .getDataByPost(payload, true, '', [])
      .pipe(map(curry(this.parseDictionaries)(dictionariesNames)));
  }

  private parseDictionaries(dictionariesNames: string[], dictionaries: string[]): any {
    return pipe(
      ramdaMap(
        pipe(
          split('|__|'),
          when(
            pipe(
              length,
              equals(1),
            ),
            pipe(
              head,
              split(','),
            ),
          ),
          converge(concat, [
            pipe(
              head,
              toLower,
              of,
            ),
            pipe(
              drop(1),
              groupWith(equals),
              ramdaMap(
                applySpec({
                  name: head,
                  id: last,
                }),
              ),
              of,
            ),
          ]),
        ),
      ) as UnaryFunction<string[], [string, DictionaryItem[]][]>,
      fromPairs as UnaryFunction<[string, DictionaryItem[]][], Dictionaries>,
    )(dictionaries);
  }
}
