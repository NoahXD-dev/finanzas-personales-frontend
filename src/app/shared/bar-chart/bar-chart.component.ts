import {
  afterEveryRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import ApexCharts from 'apexcharts';

import { BarChartSeries } from './bar-chart-series.model';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = input<string[]>([]);
  readonly series = input<BarChartSeries[]>([]);
  readonly loading = input(false);
  readonly emptyMessage = input('No hay datos para mostrar.');
  readonly title = input<string | undefined>(undefined);

  private readonly chartHost = viewChild<ElementRef<HTMLDivElement>>('chartHost');
  private chart: ApexCharts | null = null;

  constructor() {
    afterEveryRender(() => {
      const loading = this.loading();
      const categories = this.categories();
      const series = this.series();

      if (loading || categories.length === 0) {
        this.destroyChart();
        return;
      }

      this.renderOrUpdateChart(categories, series);
    });

    this.destroyRef.onDestroy(() => this.destroyChart());
  }

  private renderOrUpdateChart(
    categories: string[],
    series: BarChartSeries[],
  ): void {
    const host = this.chartHost()?.nativeElement;
    if (!host) {
      return;
    }

    const options = this.buildOptions(categories, series);

    if (this.chart) {
      void this.chart.updateSeries(
        series.map((item) => ({ name: item.name, data: item.data })),
      );
      void this.chart.updateOptions({
        xaxis: {
          categories,
          labels: {
            style: {
              colors: '#6b7280',
              fontSize: '12px',
            },
          },
        },
      });
      return;
    }

    this.chart = new ApexCharts(host, options);
    void this.chart.render();
  }

  private buildOptions(categories: string[], series: BarChartSeries[]) {
    return {
      chart: {
        type: 'bar',
        height: 320,
        fontFamily: 'Inter, sans-serif',
        toolbar: { show: false },
      },
      colors: ['#059669', '#dc2626'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      series: series.map((item) => ({ name: item.name, data: item.data })),
      xaxis: {
        categories,
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => currencyFormatter.format(value),
          style: {
            colors: '#6b7280',
            fontSize: '12px',
          },
        },
      },
      grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: '#374151' },
      },
      tooltip: {
        y: {
          formatter: (value: number) => currencyFormatter.format(value),
        },
      },
    };
  }

  private destroyChart(): void {
    this.chart?.destroy();
    this.chart = null;
  }
}
