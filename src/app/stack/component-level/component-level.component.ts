import {Component, Input, OnChanges} from '@angular/core';

import {ComponentInformationModel} from '../models/stack-report.model';

@Component({
    selector: 'component-level-information',
    templateUrl: './component-level.component.html',
    styleUrls: ['component-level.component.scss']
})

export class ComponentLevelComponent {

    @Input() component: ComponentInformationModel;

    constructor() {}

    ngOnChanges(): void {

    }

}
