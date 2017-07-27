import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {StackAnalysesService} from '../stack-analyses.service';
import {getStackReportModel} from '../utils/stack-api-utils';
import {StackReportModel, ResultInformationModel, UserStackInfoModel, ComponentInformationModel} from '../models/stack-report.model';

@Component({
    selector: 'stack-details',
    templateUrl: './stack-details.component.html',
    providers: [StackAnalysesService],
    styleUrls: ['stack-details.component.scss']
})

export class StackDetailsComponent implements OnInit {
    public error: any = {};
    public userStackInformation: UserStackInfoModel;
    public userComponentInformation: Array<ComponentInformationModel> = [];
    public dataLoaded: boolean = false;
    @Input() stack: string;

    public tabs: Array<any> = [];

    private userStackInformationArray: Array<UserStackInfoModel> = [];
    private totalManifests: number;

    public tabSelection(tab: any): void {
        tab['active'] = true;
    }

    ngOnInit(): void {
        this.init(this.stack);
    }

    constructor(private stackAnalysisService: StackAnalysesService) {}

    private handleError(error: any): void {
        this.error = {
            message: error.message
        };
    }

    private init(url: string): void {
        this.stackAnalysisService
            .getStackAnalyses(url)
            .subscribe((data) => {
                this.error = null;
                if (data && (!data.hasOwnProperty('error') && Object.keys(data).length !== 0)) {
                    let resultInformation: Observable<StackReportModel> = getStackReportModel(data);
                    resultInformation.subscribe((response) => {
                        let result: Array<ResultInformationModel> = response.result;
                        this.totalManifests = result.length;
                        this.userStackInformationArray = result.map((r) => r.user_stack_info);
                        result.forEach((r, index) => {
                            console.log('HEre');
                            this.tabs.push({
                                title: 'File',
                                content: r
                            });
                        });
                        
                        this.dataLoaded = true;
                        this.tabSelection(this.tabs[0]);
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
