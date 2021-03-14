import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDetailsWeeklyComponent } from './health-details-weekly.component';

describe('HealthDetailsWeeklyComponent', () => {
  let component: HealthDetailsWeeklyComponent;
  let fixture: ComponentFixture<HealthDetailsWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthDetailsWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthDetailsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
