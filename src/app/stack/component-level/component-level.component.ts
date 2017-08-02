import {Component, Input, OnChanges} from '@angular/core';

import {ComponentInformationModel, RecommendationsModel, OutlierInformationModel} from '../models/stack-report.model';

@Component({
    selector: 'component-level-information',
    templateUrl: './component-level.component.html',
    styleUrls: ['component-level.component.scss']
})

export class ComponentLevelComponent implements OnChanges {

    @Input() component: any;

    public dependencies: Array<ComponentInformationModel> = [];
    public recommendations: RecommendationsModel;
    private dependenciesList: Array<any> = [];
    private headers: Array<any> = [];
    private keys: any = [];
    private alternate: Array<ComponentInformationModel> = [];
    private usageOutliers: Array<OutlierInformationModel> = [];

    private fieldName: string;
    private fieldValue: string;


    constructor() {
        this.keys = {
            name: 'name',
            currentVersion: 'curret_version',
            latestVersion: 'latest_version',
            cveid: 'cveid',
            cvss: 'cvss',
            license: 'license',
            linesOfCode: 'linesOfCode',
            avgCycloComplexity: 'avgCycloComplexity',
            noOfFiles: 'noOfFiles',
            dateAdded: 'dateAdded',
            publicPopularity: 'pubPopularity',
            enterpriseUsage: 'enterpriseUsage',
            teamUsage: 'teamUsage'
        };
    }

    ngOnChanges(): void {
        if (this.component) {
            console.log(this.component);
            this.dependencies = this.component['dependencies'];
            this.recommendations = this.component['recommendations'];
            this.alternate = this.recommendations.alternate;
            this.usageOutliers = this.recommendations['usage_outliers'];
            this.handleDependencies(this.dependencies);
        }
    }

    private handleDependencies(dependencies: Array<ComponentInformationModel>): void {
        if (dependencies) {
            let length: number = dependencies.length;
            let dependency: any, eachOne: ComponentInformationModel;
            this.headers = [
                {
                    name: 'Package name',
                    identifier: this.keys['name'],
                    class: 'large',
                    isSortable: true
                }, {
                    name: 'Current Version',
                    identifier: this.keys['currentVersion'],
                    class: 'small',
                    isSortable: true
                }, {
                    name: 'Latest Version',
                    class: 'small',
                    identifier: this.keys['latestVersion']
                }, {
                    name: 'Security Issue',
                    class: 'small',
                    identifier: this.keys['avgCycloComplexity']
                }, {
                    name: 'License',
                    class: 'medium',
                    identifier: this.keys['license']
                }, {
                    name: 'Sentiment Score',
                    class: 'small',
                    identifier: this.keys['linesOfCode'],
                    isSortable: true
                }, {
                    name: 'OSIO Usage',
                    class: 'small',
                    identifier: this.keys['avgCycloComplexity']
                }, {
                    name: 'Github Usage',
                    class: 'small',
                    identifier: this.keys['avgCycloComplexity']
                }, {
                   name: 'Github Statistics',
                   class: 'medium'
                }, {
                    name: 'Top 10 dependencies',
                    class: 'medium'
                }, {
                    name: 'Action',
                    class: 'medium',
                    identifier: this.keys['noOfFiles'],
                    isSortable: true
                }
            ];

            this.dependenciesList = [];
            let linesOfCode: any = '';
            let noOfFiles: any = '';
            let tempLen: number;
            for (let i: number = 0; i < length; ++i) {
                eachOne = dependencies[i];
                dependency = this.setParams(eachOne, false);
                dependency['isUsageOutlier'] = this.isUsageOutlier(dependency['name']);
                this.dependenciesList.push(dependency);
                tempLen = this.dependenciesList.length;
                debugger;
                this.checkAlternate(eachOne['name'], eachOne['version'], this.dependenciesList);

                if (tempLen !== this.dependenciesList.length) {
                    dependency['isParent'] = true;
                }
            }
        }
    }

    private setParams(input: any, canCreateWorkItem: boolean) {
        let output: any = {};
        output['name'] = input['name'];
        output['current_version'] = input['version'];
        output['latest_version'] = input['latest_version'];
        output['license'] = input['licenses'] && input['licenses'].join(', ');
        output['sentiment_score'] = input['sentiment'] && input['sentiment']['overall_score'];
        output['github_user_count'] = input['github'] && input['github']['dependent_repos'];
        output['osio_user_count'] = input['osio_user_count'];
        output['security_issue'] = input['security'].length > 0;
        output['action'] = canCreateWorkItem ? 'Create Work Item' : '';
        return output;
    }

    private checkAlternate (name: string, version: string, list: Array<any>) {
        if (this.alternate && this.alternate.length > 0) {
            let recom: Array<ComponentInformationModel> = this.alternate.filter((a) => a.replaces[0].name === name && a.replaces[0].version === version);
            recom.forEach(r => {
                let obj: any = this.setParams(r, true);
                obj['isChild'] = true;
                list.push(obj);
            });
        }
    }

    private isUsageOutlier(packageName: string): boolean {
        let result: Array<OutlierInformationModel> = this.usageOutliers.filter(u => u.package_name === packageName);
        return result && result.length > 0;
    }

}
