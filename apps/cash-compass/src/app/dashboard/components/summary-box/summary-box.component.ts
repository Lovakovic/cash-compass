import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
import {Expense} from "@cash-compass/shared-models";

Chart.register(...registerables);

@Component({
  selector: 'cash-compass-summary-box',
  templateUrl: './summary-box.component.html',
  styleUrls: ['./summary-box.component.scss'],
})
export class SummaryBoxComponent implements OnInit, AfterViewInit {
  @Input() expenses$!: BehaviorSubject<Expense[]>;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chart!: Chart;

  ngOnInit(): void {
    this.expenses$.subscribe(expenses => {
      this.createChart(expenses);
    });
  }

  ngAfterViewInit(): void {
    this.chartCanvas.nativeElement.width = 200;
    this.chartCanvas.nativeElement.height = 200;
    this.createChart([]);
  }

  createChart(expenses: Expense[]): void {
    if(!this.chartCanvas) {
      console.log('Canvas is still undefined.')
      return;
    }

    const data = this.processData(expenses);
    if (this.chart) {
      this.chart.data = data;
      this.chart.update();
    } else {
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'doughnut',
        data: data,
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      } as never );
    }
  }

  processData(expenses: Expense[]) {
    const labels = [];
    const dataset = [];
    const backgroundColors = [];

    const groupedData = expenses.reduce((acc, curr) => {
      acc[curr.category.name] = (acc[curr.category.name] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    for (const [categoryName, amount] of Object.entries(groupedData)) {
      const category = expenses.find(expense => expense.category.name === categoryName)?.category;
      labels.push(`${category?.emoji} - ${category?.name}`);
      dataset.push(amount);
      backgroundColors.push(category?.color);
    }

    return {
      labels: labels,
      datasets: [{
        data: dataset,
        backgroundColor: backgroundColors,
      }],
    };
  }
}
