import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPopupComponent } from './view-popup.component';

describe('ViewPopupComponent', () => {
  let component: ViewPopupComponent;
  let fixture: ComponentFixture<ViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
