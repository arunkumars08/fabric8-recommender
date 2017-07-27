import { Component } from '@angular/core';

@Component({
    selector: 'f8-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public stackUrl: string = 'http://bayesian-api-bayesian-preview.b6ff.rh-idev.openshiftapps.com/api/v1/stack-analyses-v2/132389240e2342409dda9b8c800a905d';
    // public stackUrl: string = 'http://localhost:32000/api/v1/stack-analyses/ed6fc94dbe63454093c8586e5bb811dd';
}
