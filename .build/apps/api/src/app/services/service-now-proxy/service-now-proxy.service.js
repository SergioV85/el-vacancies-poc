"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var qs_1 = require("qs");
var operators_1 = require("rxjs/operators");
var ramda_1 = require("ramda");
var xml2js_1 = require("xml2js");
var ServiceNowProxyService = /** @class */ (function () {
    function ServiceNowProxyService(httpService) {
        this.httpService = httpService;
        this.serviceNowUrl = 'https://elipslife.service-now.com';
    }
    ServiceNowProxyService.prototype.getDataByPost = function (query, token, cookies) {
        var _this = this;
        if (token === void 0) { token = ''; }
        var payload = ramda_1.mergeRight({
            sysparm_aggregation_size: 1,
            sysparm_processor: 'AJAXXMLHttpAggregator',
            '0.sysparm_scope': 'x_inte3_recruit',
        }, query);
        return this.authorizeOnServiceNow().pipe(operators_1.switchMap(function () {
            return _this.httpService.post(_this.serviceNowUrl + "/recruit/xmlhttp.do", qs_1.stringify(payload), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-UserToken': token,
                    withCredentials: true,
                    Cookie: cookies.join(';'),
                },
            });
        }), operators_1.switchMap(function (_a) {
            var data = _a.data;
            return xml2js_1.parseStringPromise(data);
        }), operators_1.map(ramda_1.pathOr('', ['xml', 'xml', 0, '$', 'answer'])), operators_1.catchError(function (err) {
            var response = err.response;
            if (response.status === 401) {
                var newToken = response.headers['x-usertoken-response'];
                var receivedCookies = response.headers['set-cookie'];
                return _this.getDataByPost(payload, newToken, receivedCookies);
            }
            throw err;
        }));
    };
    ServiceNowProxyService.prototype.getRawDataByGet = function (requestString) {
        return this.httpService.get(this.serviceNowUrl + "/recruit/" + requestString).pipe(operators_1.map(function (response) { return response.data; }));
    };
    ServiceNowProxyService.prototype.authorizeOnServiceNow = function () {
        var _this = this;
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
            .pipe(operators_1.map(function (response) { return response.data; }), operators_1.switchMap(function (_a) {
            var clientId = _a[0].clientId;
            return _this.httpService.post('https://elipslife.service-now.com/amb/connect', {
                channel: '/meta/connect',
                connectionType: 'long-polling',
                id: '5',
                clientId: clientId,
            });
        }));
    };
    ServiceNowProxyService = __decorate([
        common_1.Injectable()
    ], ServiceNowProxyService);
    return ServiceNowProxyService;
}());
exports.ServiceNowProxyService = ServiceNowProxyService;
//# sourceMappingURL=service-now-proxy.service.js.map