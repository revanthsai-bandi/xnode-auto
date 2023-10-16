import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpensesPieChartComponent } from './all-expenses-pie-chart.component';

describe('AllExpensesPieChartComponent', () => {
  let component: AllExpensesPieChartComponent;
  let fixture: ComponentFixture<AllExpensesPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllExpensesPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllExpensesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
