import {Component, Input, OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {StackAnalysesService} from '../stack-analyses.service';
import {getStackReportModel} from '../utils/stack-api-utils';
import {StackReportModel, ResultInformationModel, UserStackInfoModel, ComponentInformationModel, RecommendationsModel} from '../models/stack-report.model';

@Component({
    selector: 'stack-details',
    templateUrl: './stack-details.component.html',
    providers: [StackAnalysesService],
    styleUrls: ['stack-details.component.scss']
})

export class StackDetailsComponent implements OnChanges {
    public error: any = {};
    public userStackInformation: UserStackInfoModel;
    public componentLevelInformation: any = {};
    public userComponentInformation: Array<ComponentInformationModel> = [];
    public dataLoaded: boolean = false;
    public recommendationsArray: Array<RecommendationsModel> = [];
    @Input() stack: string;

    public tabs: Array<any> = [];

    private userStackInformationArray: Array<UserStackInfoModel> = [];
    private totalManifests: number;

    public tabSelection(tab: any): void {
        tab['active'] = true;
        let currentIndex: number = tab['index'];
        let recommendations: RecommendationsModel = this.recommendationsArray[currentIndex];
        this.componentLevelInformation = {
            recommendations: recommendations,
            dependencies: tab.content.user_stack_info.dependencies
        };
    }

    ngOnChanges(): void {
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
                                content: r,
                                index: index
                            });
                            this.recommendationsArray.push(r.recommendations);
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
