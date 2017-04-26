import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Pattern } from './objects/pattern';
import { Variation } from './objects/variation';

function toPattern(r: any): Pattern {
    let pattern = new Pattern(
        r.pattern_pk_id,
        r.primary_variation_id,
        new Variation(
            r.variation_pk_id,
            r.start_state_id,
            r.created_by_id,
            r.variation_name,
            r.note,
            r.created_time
        ),
        r.pattern_name,
        r.context,
        r.forces,
        r.solution,
        r.discussion,
        r.patlet,
        r.rating,
        r.is_published
    );
    console.log('Parsed pattern:', pattern);
    return pattern;
}

@Injectable()
export class PatternService {
    private baseUrl: string = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    

    mapPatterns(response: Response): Pattern[] {
        console.log('Mapping patterns');
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

    deletePattern(id: number): Observable<void> {
        console.log('Calling delete for pattern', id);
        return this.http
                    .delete(`${this.baseUrl}/pattern/${id}`)
                    .catch(this.handleError);
    }

    createPattern(pattern: Pattern) {
        console.log('Calling create for pattern');
        this.http.post(`${this.baseUrl}/pattern`,
            {
                
            }).catch(this.handleError);
    }
}
