/**
 * Class providing http calls for BE services and providing conversion from json to classes
 */

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

    /** functions to map json data with conversion functions */
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

    mapStartStateId(response: Response): number {
        console.log('Mapping start state id');
        let id = response.json().data.start_state_id;
        if (id == null) {
            return null;
        } else {
            return parseInt(id);
        }
    }

    mapId(response: Response): number {
        console.log('Mapping state id');
        let id = response.json().data.id;
        if (id == null) {
            return null;
        } else {
            return parseInt(id);
        }
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

    /** Get all patterns */
    getPatterns(): Observable<Pattern[]> {
        console.log('Calling get for patterns');
        const patterns$ = this.http
            .get(`${this.baseUrl}/pattern`, {headers: this.getHeaders()})
            .map(this.mapPatterns)
            .catch(this.handleError);
        return patterns$;
    }

    /** get one pattern by id */
    getPattern(id: number): Observable<Pattern> {
        console.log('Getting pattern', id);
        const pattern$ = this.http
            .get(`${this.baseUrl}/pattern/${id}`, {headers: this.getHeaders()})
            .map(this.mapPattern)
            .catch(this.handleError);
        return pattern$;
    }

    /** delete pattern by id */
    deletePattern(id: number): Observable<void> {
        console.log('Calling delete for pattern', id);
        return this.http
                    .delete(`${this.baseUrl}/pattern/${id}`)
                    .catch(this.handleError);
    }

    /** create pattern */
    createPattern(pattern: Pattern): Observable<void> {
        console.log('Calling create for pattern');
        return this.http
            .post(`${this.baseUrl}/pattern`, {
                'name': pattern.name,
                'patlet': pattern.patlet    
            })
            .catch(this.handleError);
    }

    /** update pattern */
    updatePattern(pattern: Pattern): Observable<void> {
        console.log('Calling update for pattern', pattern.id);
        return this.http
            .put(`${this.baseUrl}/pattern/${pattern.id}`, {
                'name': pattern.name,
                'patlet': pattern.patlet    
            })
            .catch(this.handleError);
    }

    /** create state */
    createState(state: State): Observable<number> {
        console.log('Calling create for state');
        const id$ = this.http
            .post(`${this.baseUrl}/state`, {
                'name': state.name,
                'description': state.description,
                'position_x': '200',
                'position_y': '200',
                'width': '160',
                'height': '100',
                'variation_id': state.variationId
            })
            .map(this.mapId)
            .catch(this.handleError);
        return id$;
    }

    /** update state */
    updateState(state: State): Observable<void> {
        console.log('Calling update for state', state.id);
        return this.http
            .put(`${this.baseUrl}/state/${state.id}`, {
                'name': state.name,
                'description': state.description,
                'position_x': '200',
                'position_y': '200',
                'width': '160',
                'height': '100'  
            })
            .catch(this.handleError);
    }

    /** create transition */
    createTransition(transition: Transition): Observable<number> {
        console.log('Calling create for transition');
        const id$ = this.http
            .post(`${this.baseUrl}/transition`, {
                'name': transition.name,
                'description': transition.description,
                'state_from_id': transition.stateFromId,
                'state_to_id': transition.stateToId
            })
            .map(this.mapId)
            .catch(this.handleError);
        return id$;
    }

    updateTransition(transition: Transition): Observable<void> {
        console.log('Calling update for transition', transition.id);
        return this.http
            .put(`${this.baseUrl}/transition/${transition.id}`, {
                'name': transition.name,
                'description': transition.description,
                'state_from_id': transition.stateFromId,
                'state_to_id': transition.stateToId 
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

    /** get all transitions of a state */
    getTransitionsByState(stateId: number): Observable<Transition[]>{
        console.log('Calling get for transitions of state', stateId);
        const transitions$ = this.http
            .get(`${this.baseUrl}/transition/${stateId}`, {headers: this.getHeaders()})
            .map(this.mapTransitions)
            .catch(this.handleError);
        return transitions$;
    }

    /** get states by variation */
    getStates(variationId: number): Observable<State[]>{
        console.log('Calling get for states');
        const states$ = this.http
            .get(`${this.baseUrl}/states/${variationId}`, {headers: this.getHeaders()})
            .map(this.mapStates)
            .catch(this.handleError);
        return states$;
    }

    /** get transitions by variation */
    getTransitionsByVariation(variationId: number): Observable<Transition[]>{
        console.log('Calling get for transitions by variation');
        const transitions$ = this.http
            .get(`${this.baseUrl}/transitions/${variationId}`, {headers: this.getHeaders()})
            .map(this.mapTransitions)
            .catch(this.handleError);
        return transitions$;
    }

    /** get start state */
    getStartState(variationId: number): Observable<number>{
        console.log('Calling get for start state');
        const startStateId$ = this.http
            .get(`${this.baseUrl}/variation/setStartState/${variationId}`, {headers: this.getHeaders()})
            .map(this.mapStartStateId)
            .catch(this.handleError);
        return startStateId$;
    }

    setStartState(variationId: number, stateId: number): Observable<void>{
        console.log('Setting new start state');
        return this.http
                   .put(`${this.baseUrl}/variation/setStartState/${variationId}`, {
                       'start_state_id': stateId
                   })
                   .catch(this.handleError)
    }

    deleteState(id: number): Observable<void> {
        console.log('Calling delete for state', id);
        return this.http
                   .delete(`${this.baseUrl}/state/${id}`)
                   .catch(this.handleError);
    }

    deleteTransition(id: number): Observable<void> {
        console.log('Calling delete for transition', id);
        return this.http
                   .delete(`${this.baseUrl}/transition/${id}`)
                   .catch(this.handleError);
    }
}
