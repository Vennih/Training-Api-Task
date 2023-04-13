import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistfullComponent } from './userlistfull.component';

describe('UserlistfullComponent', () => {
  let component: UserlistfullComponent;
  let fixture: ComponentFixture<UserlistfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlistfullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlistfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
