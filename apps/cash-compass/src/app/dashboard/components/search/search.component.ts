import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {FilterData} from "../../dashboard.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ExpenseService} from "../../../service/expense.service";
import {Category} from "@cash-compass/shared-models";

@Component({
  selector: 'cash-compass-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class SearchComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterData>();
  categories: Category[] = [];
  showExtraFilters = false;
  monthYearOptions: string[] = [];

  placeholderSearchTerm = 'Search for expense...';

  searchTerm = '';
  sortOrder: 'cheapest' | 'most-expensive' | 'newest' | 'oldest' = 'newest';
  filterCategoryId = '';
  selectedMonthYear?: string;
  startDate?: Date;
  endDate?: Date;

  constructor(private categoryService: CategoryService,
              private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    // Fetch earliest expense date and generate month-year options
    this.expenseService.getEarliestExpenseDate().subscribe(earliestDate => {
      this.generateMonthYearOptions(earliestDate);
    });

    this.clearFilter();
  }

  handleFilterChange(): void {
    const filterCategory = this.categories.find(category => category.id === this.filterCategoryId);

    const filterData: FilterData = {
      searchTerm: this.searchTerm,
      sortOrder: this.sortOrder,
      filterCategory: filterCategory,
      startDate: this.startDate,
      endDate: this.endDate
    };

    if (this.selectedMonthYear === 'all') {
      filterData.startDate = undefined;
      filterData.endDate = undefined;
    } else if (this.selectedMonthYear) {
      const [month, year] = this.selectedMonthYear.split('-').map(Number);
      filterData.startDate = new Date(year, month - 1, 1);
      filterData.endDate = new Date(year, month, 0);
    }

    if (this.startDate) {
      const start = new Date(this.startDate);
      start.setHours(0, 0, 0, 0);
      filterData.startDate = start;
    }

    if(this.endDate) {
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999);
      filterData.endDate = end;
    }

    this.filterChange.emit(filterData);
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.sortOrder = 'newest';
    this.filterCategoryId = '';

    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = currentDate.getFullYear();
    this.selectedMonthYear = `${currentMonth}-${currentYear}`;

    this.startDate = undefined;
    this.endDate = undefined;

    this.handleFilterChange();
  }

  toggleExtraFilters(): void {
    this.showExtraFilters = !this.showExtraFilters;
  }

  generateMonthYearOptions(earliestDate: Date): void {
    const start = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
    const end = new Date();

    // Set end to the first day of the current month
    end.setDate(1);
    end.setHours(0, 0, 0, 0);

    while (start.getTime() <= end.getTime()) {
      const month = String(start.getMonth() + 1).padStart(2, '0');
      const year = start.getFullYear();
      this.monthYearOptions.unshift(`${month}-${year}`);

      start.setMonth(start.getMonth() + 1);
    }
  }
}
