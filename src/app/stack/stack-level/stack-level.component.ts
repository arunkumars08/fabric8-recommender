import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'stack-level-information',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './stack-level.component.html',
    styleUrls: ['stack-level.component.scss']
})

export class StackLevelComponent {
    public tabs: Array<any> = [];

    constructor() {
        this.tabs = [
            {
                title: 'Tab1',
                content: 'Sample Content'
            },
            {
                title: 'Tab2',
                content: 'Sample Content2'
            }
        ];
    }
}
