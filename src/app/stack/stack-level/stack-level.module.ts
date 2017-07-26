import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsModule} from 'ng2-bootstrap';

import {StackLevelComponent} from './stack-level.component';

@NgModule({
    imports: [
        CommonModule,
        TabsModule.forRoot()
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
