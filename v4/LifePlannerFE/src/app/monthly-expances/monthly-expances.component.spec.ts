import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpancesComponent } from './monthly-expances.component';

describe('MonthlyExpancesComponent', () => {
  let component: MonthlyExpancesComponent;
  let fixture: ComponentFixture<MonthlyExpancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyExpancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyExpancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
