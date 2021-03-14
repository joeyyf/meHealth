import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDetailsMonthlyComponent } from './health-details-monthly.component';

describe('HealthDetailsMonthlyComponent', () => {
  let component: HealthDetailsMonthlyComponent;
  let fixture: ComponentFixture<HealthDetailsMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthDetailsMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthDetailsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
