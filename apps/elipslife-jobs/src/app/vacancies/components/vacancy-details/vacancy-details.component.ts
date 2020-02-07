import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VacancyDetails } from '@el/api-interfaces';
import { VacanciesService } from '../../../libs/services/vacancies/vacancies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'el-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.scss'],
})
export class VacancyDetailsComponent implements OnInit, OnDestroy {
  public vacancy$?: Observable<VacancyDetails>;
  private readonly vacancyId: string;
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly vacanciesService: VacanciesService, route: ActivatedRoute) {
    console.log(route);
    this.vacancyId = route.snapshot.params.id;
  }

  public ngOnInit() {
    this.vacancy$ = this.vacanciesService.getVacancyDetails(this.vacancyId).pipe(takeUntil(this.ngUnsubscribe));
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
