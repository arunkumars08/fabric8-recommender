import { Observable } from 'rxjs';
import {StackReportModel} from '../models/stack-report.model';

export function getStackReportModel(data: any): Observable<StackReportModel> {
    let result: any = data;
    return Observable.create((observer) => {
        let model: StackReportModel = [result].map(response => response as StackReportModel)[0];
        observer.next(model);
        observer.complete();
    });
}
