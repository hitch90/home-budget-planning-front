import {
    Component,
    DoCheck,
    ElementRef,
    Input,
    KeyValueDiffers,
    OnInit,
    ViewChild
} from '@angular/core';
// @ts-ignore
import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, DoCheck {
    @ViewChild('chart', { static: true }) chartDiv: ElementRef;
    @Input() data;

    isLoaded = false;
    differ: any;
    options = {
        series: [
            {
                name: '...',
                data: []
            }
        ],
        chart: {
            type: 'line',
            height: 200,
            dropShadow: {
                enabled: true,
                color: '#008FFB',
                top: 10,
                left: 0,
                blur: 10,
                opacity: 0.4
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: [
                'Sty',
                'Luty',
                'Mar',
                'Kw',
                'Maj',
                'Czer',
                'Lip',
                'Sie',
                'Wrz',
                'Paz',
                'Lis',
                'Gr'
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
                    return val + ' zł';
                }
            }
        }
    };
    constructor(private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create();
    }

    ngOnInit(): void {}

    drawChart(data) {
        const chart = new ApexCharts(this.chartDiv.nativeElement, this.options);
        this.options.series[0].data = data.map(item => item.toFixed(2));
        chart.render();
    }

    ngDoCheck() {
        const changes = this.differ.diff(this.data);
        if (changes) {
            changes.forEachChangedItem(() => {
                if (this.data?.balance.length && this.isLoaded === false) {
                    this.drawChart(this.data.balance);
                    this.isLoaded = true;
                }
            });
        }
    }
}
