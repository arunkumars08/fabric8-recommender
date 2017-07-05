import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PreviewComponent} from './preview.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PreviewComponent
    ],
    exports: [
        PreviewComponent
    ]
})

export class PreviewModule {}
