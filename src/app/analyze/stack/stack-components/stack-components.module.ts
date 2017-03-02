import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StackComponents } from './stack-components.component';
import { TableFilter } from './table-filter.pipe';
import { TableOrderByPipe } from './table-orderby.pipe';

import { ChartsModule } from '../common/charts/charts.module';

@NgModule({
    imports: [
        CommonModule,
        ChartsModule
    ],
    declarations: [
        StackComponents,
        TableFilter,
        TableOrderByPipe
    ],
    exports: [
        StackComponents,
        TableFilter,
        TableOrderByPipe,
        ChartsModule
    ]
})

export class StackComponentsModule {}
