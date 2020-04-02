import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// @ts-ignore
import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    @ViewChild('chart', { static: true }) chartDiv: ElementRef;
    @Input() data;
    options = {
        series: [],
        chart: {
            type: 'bar',
            height: 300
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: [
                'Sty',
                'Lut',
                'Mar',
                'Kwi',
                'Maj',
                'Cze',
                'Lip',
                'Sie',
                'Wrz',
                'Paź',
                'Lis',
                'Gru'
            ]
        },
        yaxis: {
            title: {
                text: 'PLN'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + ' PLN';
                }
            }
        }
    };

    constructor() {}

    ngOnInit(): void {
        this.drawChart();
    }

    drawChart() {
        this.options.series = [{ name: 'Wydatki', data: this.data.map(i => Math.floor(i))}];
        const chart = new ApexCharts(this.chartDiv.nativeElement, this.options);
        chart.render();
    }
}
