import { Injectable, HttpService } from '@nestjs/common';
import { pipe, Observable, UnaryFunction } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { pathOr, mergeRight, pluck } from 'ramda';
import { stringify } from 'qs';
import { parseStringPromise } from 'xml2js';
import { ServiceNowPayload } from '@el/api-interfaces';

@Injectable()
export class ServiceNowProxyService {
  private serviceNowUrl = 'https://elipslife.service-now.com';

  constructor(private readonly httpService: HttpService) {}

  public getDataByPost(
    query: Partial<ServiceNowPayload>,
    isMultiple = false,
    token = '',
    cookies: [],
  ): Observable<string | string[]> {
    const payload = mergeRight(
      {
        sysparm_processor: 'AJAXXMLHttpAggregator',
      },
      query,
    );

    const parsingResponse: UnaryFunction<any, string | string[]> = isMultiple
      ? (pipe(
          pathOr([], ['xml', 'xml']),
          pluck('$'),
          pluck('answer'),
        ) as UnaryFunction<any, string[]>)
      : pathOr('', ['xml', 'xml', 0, '$', 'answer']);

    return this.authorizeOnServiceNow().pipe(
      switchMap(() =>
        this.httpService.post(`${this.serviceNowUrl}/recruit/xmlhttp.do`, stringify(payload), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-UserToken': token,
            withCredentials: true,
            Cookie: cookies.join(';'),
          },
        }),
      ),
      switchMap(({ data }) => parseStringPromise(data)),
      map(parsingResponse),
      catchError(err => {
        const { response } = err;
        if (response.status === 401) {
          const newToken = response.headers['x-usertoken-response'];
          const receivedCookies = response.headers['set-cookie'];
          return this.getDataByPost(payload, isMultiple, newToken, receivedCookies);
        }
        throw err;
      }),
    );
  }

  public getRawDataByGet(requestString: string) {
    return this.httpService.get(`${this.serviceNowUrl}/recruit/${requestString}`).pipe(map(response => response.data));
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
}
