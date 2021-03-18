import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsWeeklyComponent } from './charts-weekly.component';

describe('ChartsWeeklyComponent', () => {
  let component: ChartsWeeklyComponent;
  let fixture: ComponentFixture<ChartsWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
