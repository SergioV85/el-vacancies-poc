import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { VacancyDetails } from '@el/api-interfaces';

@Component({
  selector: 'el-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.scss'],
})
export class VacancyDetailsComponent {
  public readonly vacancy: VacancyDetails;
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(route: ActivatedRoute) {
    this.vacancy = route.snapshot.data[0];
  }
}
