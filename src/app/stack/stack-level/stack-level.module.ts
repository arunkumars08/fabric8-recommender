import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StackLevelComponent} from './stack-level.component';
import {ChartModule} from '../utils/chart/chart.module';

@NgModule({
    imports: [
        CommonModule,
        ChartModule
    ],
    declarations: [
        StackLevelComponent
    ],
    exports: [
        StackLevelComponent
    ]
})

export class StackLevelModule {

}
