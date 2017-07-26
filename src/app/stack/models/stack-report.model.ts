export class StackReportModel {
    finishedAt: string;
    requestId: string;
    resultInformation: Array<ResultInformationModel>;
    startedAt: string;
}

export class ResultInformationModel {
    auditInformation: AuditInformationModel;
    release: string;
    manifestName: string;
    recommendations: Array<RecommendationsModel>;
    usageStackInfo: UserStackInfoModel;
}

export class AuditInformationModel {
    endedAt: string;
    startedAt: string;
    version: string;
}

export class RecommendationsModel {
    alternateComponents: Array<ComponentInformationModel>;
    companionComponents: Array<ComponentInformationModel>;
    usageOutliers: Array<OutlierInformationModel>;
}

export class ComponentInformationModel {
    codeMetrics: any; // Ignored from strict typing as this is of least importance
    ecosystem: string;
    github: GithubModel;
    latestVersion: string;
    licenses: Array<string>;
    name: string;
    osioUserCount: number;
    replaces: any;
    security: Array<string>;
    sentiment: SentimentModel;
    version: string;
}

export class GithubModel {
    contributors: number;
    dependentProjects: number;
    dependentRepos: number;
    firstReleaseDate: string;
    forksCount: number;
    monthlyIssuesClosed: number;
    monthlyIssuesOpened: number;
    yearlyIssuesClosed: number;
    yearlyIssuesOpened: number;
    latestReleaseDuration: string;
    monthlyPullRequestsOpen: number;
    monthlyPullRequestsClose: number;
    size: string;
    stargazersCount: number;
    totalReleases: number;
    usedBy: Array<any>;
    watchers: number;
}

export class SentimentModel {
    latestComment: string;
    overallScore: number;
}

export class OutlierInformationModel {
    outlierProbabilty: number;
    packageName: string;
}

export class UserStackInfoModel {
    analyzedDependencies: Array<any>;
    analyzedDependenciesCount: number;
    dependencies: Array<ComponentInformationModel>;
    distinctLicenses: Array<string>;
    ecosystem: string;
    recommendationReady: boolean;
    recommendedStackLicenses: Array<string>;
    stackLicenseConflict: boolean;
    totalLicenses: number;
    unknownDependencies: Array<any>;
    unknownDependenciesCount: number;
}
