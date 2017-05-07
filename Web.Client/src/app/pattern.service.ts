import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Pattern } from './objects/pattern';
import { Variation } from './objects/variation';
import { State } from './objects/state';
import { Transition } from './objects/transition';

import { 
    toPattern,
    toPatternWithVariation,
    toState,
    toTransition
} from './json-conversion-functions';

@Injectable()
export class PatternService {
    private baseUrl: string = 'http://localhost:3000/api';

    constructor(private http: Http) { }

    mapPatterns(response: Response): Pattern[] {
        console.log('Mapping patterns');
        return response.json().data.map(toPatternWithVariation);
    }
    
    mapPattern(response: Response): Pattern {
        console.log('Mapping pattern');
        return toPattern(response.json().data);
    }

    mapState(response: Response): State {
        console.log('Mapping state');
        return toState(response.json().data);
    }

    mapStates(response: Response): State[]{
        console.log('Mapping states');
        return response.json().data.map(toState);
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

    getPattern(id: number): Observable<Pattern> {
        console.log('Getting pattern', id);
        const pattern$ = this.http
            .get(`${this.baseUrl}/pattern/${id}`, {headers: this.getHeaders()})
            .map(this.mapPattern)
            .catch(this.handleError);
        return pattern$;
    }

    deletePattern(id: number): Observable<void> {
        console.log('Calling delete for pattern', id);
        return this.http
                    .delete(`${this.baseUrl}/pattern/${id}`)
                    .catch(this.handleError);
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

    updatePattern(pattern: Pattern): Observable<void> {
        console.log('Calling update for pattern', pattern.id);
        return this.http
            .put(`${this.baseUrl}/pattern/${pattern.id}`, {
                'name': pattern.name,
                'patlet': pattern.patlet    
            })
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

    getStates(variationId: number): Observable<State[]>{
        console.log('Calling get for states');
        const states$ = this.http
            .get(`${this.baseUrl}/states/${variationId}`, {headers: this.getHeaders()})
            .map(this.mapStates)
            .catch(this.handleError);
        return states$;
    }

    getTransitionsByVariation(variationId: number): Observable<Transition[]>{
        console.log('Calling get for transitions by variation');
        const transitions$ = this.http
            .get(`${this.baseUrl}/transitions/${variationId}`, {headers: this.getHeaders()})
            .map(this.mapTransitions)
            .catch(this.handleError);
        return transitions$;
    }
}
