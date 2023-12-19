import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericScreenComponent } from './generic-screen.component';

describe('GenericScreenComponent', () => {
  let component: GenericScreenComponent;
  let fixture: ComponentFixture<GenericScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
