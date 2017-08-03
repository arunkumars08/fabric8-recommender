import {NgModule} from '@angular/core';

import {SentimentComponent} from './sentiment.component';
import {ChartModule} from '../chart/chart.module';

@NgModule({
    imports: [
        ChartModule
    ],
    declarations: [
        SentimentComponent
    ],
    exports: [
        SentimentComponent
    ]
})
export class SentimentModule {}
