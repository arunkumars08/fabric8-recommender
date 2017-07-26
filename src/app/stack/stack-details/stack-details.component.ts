import {Component, Input, OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {StackAnalysesService} from '../stack-analyses.service';
import {getStackReportModel} from '../utils/stack-api-utils';
import {StackReportModel, ResultInformationModel} from '../models/stack-report.model';

@Component({
    selector: 'stack-details',
    templateUrl: './stack-details.component.html',
    providers: [StackAnalysesService],
    styleUrls: ['stack-details.component.scss']
})

export class StackDetailsComponent {
    public error: any = {};
    @Input() stack: string;

    private totalManifests: number;

    ngOnChanges(): void {
        this.init(this.stack);
    }

    constructor(private stackAnalysisService: StackAnalysesService) {}

    private handleError(error: any): void {
        this.error = {
            message: error.message
        };
    }

    private stackLevelInformation(result: Array<ResultInformationModel>): void {

    }

    private init(url: string): void {
        this.stackAnalysisService
            .getStackAnalyses(url)
            .subscribe((data) => {
                this.error = null;
                if (data && (!data.hasOwnProperty('error') && Object.keys(data).length !== 0)) {
                    let resultInformation: Observable<StackReportModel> = getStackReportModel(data);
                    resultInformation.subscribe((response) => {
                        let result: Array<ResultInformationModel> = response.resultInformation;
                        this.totalManifests = result.length;
                        this.stackLevelInformation(result);
                    });
                } else {
                    this.handleError({
                        message: 'Error API failure'
                    });
                }
            },
            error => {
                this.handleError(error);
            });
    }
}
