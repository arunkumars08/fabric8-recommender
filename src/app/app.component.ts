import { Component } from '@angular/core';

@Component({
    selector: 'f8-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public stackUrl: string = 'https://gist.githubusercontent.com/samuzzal-choudhury/005dd247395b09acc77a4cdffeb7e650/raw/9e832d9ba91cc5bc099d18c0bd0fd275e86dc3d5/response.json';
    // public stackUrl: string = 'http://localhost:32000/api/v1/stack-analyses/ed6fc94dbe63454093c8586e5bb811dd';
}
