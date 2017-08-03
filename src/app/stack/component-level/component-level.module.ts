import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentLevelComponent} from './component-level.component';
import {EllipsisDirective} from '../utils/ellipsis.directive';
import {SentimentModule} from '../utils/sentiment/sentiment.module';

@NgModule({
    imports: [
        CommonModule,
        SentimentModule
    ],
    declarations: [
        ComponentLevelComponent,
        EllipsisDirective
    ],
    exports: [
        ComponentLevelComponent
    ]
})

export class ComponentLevelModule {

}
