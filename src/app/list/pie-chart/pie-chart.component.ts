import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
    @ViewChild('chart', { static: true }) chartDiv: ElementRef;
    @Input() categories;
    options = {
        series: [],
        chart: {
            width: 450,
            type: 'pie'
        },
        labels: [],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };
    constructor() {}

    ngOnInit(): void {
        this.drawChart();
    }

    drawChart(data?) {
        const chart = new ApexCharts(this.chartDiv.nativeElement, this.options);
        this.categories.map(cat => {
            this.options.series.push(cat.sum);
            this.options.labels.push(cat.name);
        });
        chart.render();
    }
}
