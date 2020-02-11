import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'el-vacancy-apply',
  templateUrl: './vacancy-apply.component.html',
  styleUrls: ['./vacancy-apply.component.scss'],
})
export class VacancyApplyComponent implements OnInit {
  constructor(route: ActivatedRoute) {
    console.log(route.snapshot.data);
  }

  public ngOnInit() {}
}
