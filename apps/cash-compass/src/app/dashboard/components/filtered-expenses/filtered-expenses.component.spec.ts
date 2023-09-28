import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilteredExpensesComponent } from './filtered-expenses.component';

describe('MonthlyExpensesComponent', () => {
  let component: FilteredExpensesComponent;
  let fixture: ComponentFixture<FilteredExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilteredExpensesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilteredExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
