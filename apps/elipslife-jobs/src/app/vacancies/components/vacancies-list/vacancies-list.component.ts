import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Vacancy } from '@el/api-interfaces';
import { VacanciesService } from '../../../libs/services/vacancies/vacancies.service';

@Component({
  selector: 'el-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
})
export class VacanciesListComponent implements OnInit, OnDestroy {
  public vacancies$?: Observable<Vacancy[]>;
  public isLoading = true;
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly vacanciesService: VacanciesService) {}

  public ngOnInit() {
    this.vacancies$ = this.vacanciesService.getVacancies().pipe(
      finalize(() => (this.isLoading = false)),
      takeUntil(this.ngUnsubscribe),
    );
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
