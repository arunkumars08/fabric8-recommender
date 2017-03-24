import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from 'ngx-login-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RecommenderListApi {

  private url: string;

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private workItemsRoute: string = 'workitems';

  constructor(
    private http: Http
    ) {
     this.url = 'http://www.sample.com';
    }

  recommendationList(recommendationListData: any): Observable<any> {
    let options = new RequestOptions({ headers: this.headers });
    let body = JSON.stringify(recommendationListData);
    console.log(body);
    return this.http.post(this.url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
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
