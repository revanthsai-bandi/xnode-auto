import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpensesGraphComponent } from './all-expenses-graph.component';

describe('AllExpensesGraphComponent', () => {
  let component: AllExpensesGraphComponent;
  let fixture: ComponentFixture<AllExpensesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllExpensesGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllExpensesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
