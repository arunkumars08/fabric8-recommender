import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WIT_API_URL } from 'ngx-fabric8-wit';

@Injectable()
export class StackAnalysesService {

  private stackAnalysesUrl;

  constructor(
    private http: Http,
    @Inject(WIT_API_URL) apiUrl: string,
  ) {
    this.stackAnalysesUrl = 'http://recommender.api.prod-preview.openshift.io/api/v1/';
    if(apiUrl) {
      this.stackAnalysesUrl = apiUrl.replace('//', '//recommender.');
      let len: number = this.stackAnalysesUrl.length;
      if(this.stackAnalysesUrl[len - 1] !== '/') {
        this.stackAnalysesUrl += '/';
      }
      this.stackAnalysesUrl += 'v1/';
    }

  }

  getStackAnalyses(id: string): Observable<any> {
    return this.http.get(this.buildStackAnalysesUrl(id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  private buildStackAnalysesUrl(id: string): string {
    return this.stackAnalysesUrl + 'stack-analyses/' + id;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
