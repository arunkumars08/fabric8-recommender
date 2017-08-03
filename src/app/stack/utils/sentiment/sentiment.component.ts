import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'sentiment',
    templateUrl: './sentiment.component.html',
    styleUrls: ['sentiment.component.scss']
})
export class SentimentComponent implements OnChanges {
    @Input() score;
    public metric: any = {};
    public gaugeChart: any = {};

    private threshold: any = {
        start: -0.3,
        end: 0.3
    };

    ngOnChanges(): void {
        if (this.score) {
            this.metric['feeling'] = this.getStatus(Number(this.score));
            this.gaugeChart = {
                    data: {
                        columns: [
                            ['data', this.score]
                        ],
                        type: 'gauge'
                    },
                    configs: {
                        legend: {
                            show: true
                        }
                    },
                    options: {
                        gauge: {
                            label: {
                                format: function(value, ratio) {
                                    return value;
                                }
                            },
                            min: -1,
                            max: 1,
                            width: 10, // for adjusting arc thickness
                            title: ''
                        },
                        color: {
                            pattern: ['#cf2a0e', '#bdcf0e', '#368a55'],
                            threshold: {
                                values: [this.threshold['start'], this.threshold['end'], 1]
                            }
                        },
                        size: {
                            height: 50
                        }
                    }
                };
        }
    }

    getStatus(score: number): string {
        if (score < this.threshold['start']) return 'SAD';
        if (score > this.threshold['end']) return 'HAPPY';
        return 'NORMAL';
    }
}
