import { Injectable, HttpService } from '@nestjs/common';
import { stringify } from 'qs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { pathOr, mergeRight } from 'ramda';
import { parseStringPromise } from 'xml2js';
import { ServiceNowPayload } from '@el/api-interfaces';

@Injectable()
export class ServiceNowProxyService {
  private serviceNowUrl = 'https://elipslife.service-now.com';

  constructor(private readonly httpService: HttpService) {}

  public getDataByPost(query: Partial<ServiceNowPayload>, token = '', cookies: []) {
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
      map(pathOr('', ['xml', 'xml', 0, '$', 'answer'])),
      catchError(err => {
        const { response } = err;
        if (response.status === 401) {
          const newToken = response.headers['x-usertoken-response'];
          const receivedCookies = response.headers['set-cookie'];
          return this.getDataByPost(payload, newToken, receivedCookies);
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
