"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var ramda_1 = require("ramda");
var cheerio = require("cheerio");
var VacancyService = /** @class */ (function () {
    function VacancyService(serviceNow) {
        this.serviceNow = serviceNow;
    }
    VacancyService.prototype.getVacancies = function () {
        var referrer = 'joblist.do?lang=en';
        var payload = {
            x_referer: referrer,
            '0.sysparm_toggler': 1,
            '0.sysparm_processor': 'getLocationJobs',
            '0.sysparm_name': 'Jobs',
            '0.sysparm_lang': 'en',
            '0.sysparm_job_loc': 'ALL',
        };
        return this.serviceNow.getDataByPost(payload, '', []).pipe(operators_1.map(this.parseVacancies));
    };
    VacancyService.prototype.getVacancy = function (id) {
        var uri = "details.do?sysparm_document_key=x_inte3_recruit_request," + id + "&lang=en";
        return this.serviceNow.getRawDataByGet(uri).pipe(operators_1.map(this.parseVacancyDetails));
    };
    VacancyService.prototype.parseVacancies = function (vacancies) {
        return ramda_1.pipe(ramda_1.split('|__|'), ramda_1.map(ramda_1.split('-::-')), ramda_1.transpose, ramda_1.drop(1), ramda_1.map(ramda_1.applySpec({
            name: ramda_1.nth(0),
            location: ramda_1.pipe(ramda_1.nth(1), ramda_1.when(ramda_1.anyPass([ramda_1.isNil, ramda_1.isEmpty, ramda_1.equals('undefined')]), function () { return 'any'; })),
            id: ramda_1.nth(2),
            country: ramda_1.pipe(ramda_1.nth(3), ramda_1.when(ramda_1.anyPass([ramda_1.isNil, ramda_1.isEmpty, ramda_1.equals('undefined')]), function () { return 'any'; })),
        })))(vacancies);
    };
    VacancyService.prototype.parseVacancyDetails = function (html) {
        var page = cheerio.load(html);
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
    };
    VacancyService = __decorate([
        common_1.Injectable()
    ], VacancyService);
    return VacancyService;
}());
exports.VacancyService = VacancyService;
//# sourceMappingURL=vacancy.service.js.map