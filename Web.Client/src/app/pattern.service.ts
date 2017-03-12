import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Pattern } from './objects/pattern';

function toPattern(r: any): Pattern {
    const pattern = <Pattern>({
        id: r.id,
        name: r.name,
        description: r.context,
        rating: 4,
        published: false,
    });
    console.log('Parsed pattern:', pattern);
    return pattern;
}

@Injectable()
export class PatternService {
    private baseUrl: string = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    

    mapPatterns(response: Response): Pattern[] {
        console.log('Mapping patterns');
        // return response.json().data.map(function toPattern(r: any): Pattern {
        //     const pattern = <Pattern>({
        //         id: r.id,
        //         name: r.name,
        //         description: r.context,
        //         rating: 4,
        //         published: false,
        //     });
        //     console.log('Parsed pattern:', pattern);
        //     return pattern;
        // });
        return response.json().data.map(toPattern);
    }

    private getHeaders(): Headers {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private handleError(error: any) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable.throw(error.message || error);
    }

    getPatterns(): Observable<Pattern[]> {
        console.log('Calling get for patterns');
        const patterns$ = this.http
            .get(`${this.baseUrl}/pattern`, {headers: this.getHeaders()})
            .map(this.mapPatterns)
            .catch(this.handleError);
        return patterns$;
    }
}
