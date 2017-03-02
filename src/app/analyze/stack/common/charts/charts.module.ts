import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ChartComponent } from './chart-component';

@NgModule({
    declarations: [
        ChartComponent
    ],
    exports: [
        ChartComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class ChartsModule {}
