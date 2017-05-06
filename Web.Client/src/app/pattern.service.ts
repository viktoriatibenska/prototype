import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Pattern } from './objects/pattern';
import { Variation } from './objects/variation';
import { State } from './objects/state';
import { Transition } from './objects/transition';

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

function toState(r: any): State {
    let state = new State(
        r.id,
        r.variation_id,
        r.name,
        r.description,
        r.positionX,
        r.positionY,
        r.width,
        r.height
    );
    console.log('Parsed state:', state);
    return state;
}

function toTransition(r: any): Transition {
    let transition = new Transition(
        r.id,
        r.name,
        r.description,
        r.state_from_id,
        r.state_to_id
    );
    console.log('Parsed transition:', transition);
    return transition;
}

@Injectable()
export class PatternService {
    private baseUrl: string = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    mapPatterns(response: Response): Pattern[] {
        console.log('Mapping patterns');
        return response.json().data.map(toPattern);
    }
    
    mapState(response: Response): State {
        console.log('Mapping state');
        return toState(response.json().data);
    }

    mapTransitions(response: Response): Transition[] {
        console.log('Mapping transitions');
        return response.json().data.map(toTransition);
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

    getState(id: number): Observable<State>{
        console.log('Calling get for state', id);
        const state$ = this.http
            .get(`${this.baseUrl}/state/${id}`, {headers: this.getHeaders()})
            .map(this.mapState)
            .catch(this.handleError);
        return state$;
    }

    getTransitionsByState(stateId: number): Observable<Transition[]>{
        console.log('Calling get for transitions of state', stateId);
        const transitions$ = this.http
            .get(`${this.baseUrl}/transition/${stateId}`, {headers: this.getHeaders()})
            .map(this.mapTransitions)
            .catch(this.handleError);
        return transitions$;
    }

    createPattern(pattern: Pattern): Observable<void> {
        console.log('Calling create for pattern');
        return this.http
            .post(`${this.baseUrl}/pattern`, {
                'name': pattern.name,
                'patlet': pattern.patlet    
            })
            .catch(this.handleError);
    }
}
