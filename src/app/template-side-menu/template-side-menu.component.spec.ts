import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSideMenuComponent } from './template-side-menu.component';

describe('TemplateSideMenuComponent', () => {
  let component: TemplateSideMenuComponent;
  let fixture: ComponentFixture<TemplateSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
