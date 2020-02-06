import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyApplyComponent } from './vacancy-apply.component';

describe('VacancyApplyComponent', () => {
  let component: VacancyApplyComponent;
  let fixture: ComponentFixture<VacancyApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
