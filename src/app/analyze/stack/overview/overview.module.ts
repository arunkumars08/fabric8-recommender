import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewComponent } from './overview.component';
import { ChartsModule } from '../common/charts/charts.module';

@NgModule({
    imports: [
        CommonModule,
        ChartsModule
    ],
    declarations: [
        OverviewComponent
    ],
    exports: [
        OverviewComponent,
        ChartsModule
    ]
})
export class OverviewModule {}
