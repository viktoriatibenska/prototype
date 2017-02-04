import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pattern } from './objects/pattern';

@Injectable()
export class PatternService {
    private patternsUrl = 'api/patterns';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){}

    getPatterns(): Promise<Pattern[]> {
        return this.http.get(this.patternsUrl)
               .toPromise()
               .then(response => response.json().data as Pattern[])
               .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getPatternsSlowly(): Promise<Pattern[]> {
        return new Promise<Pattern[]>(resolve => setTimeout(resolve, 2000)).then(() => this.getPatterns());
    }

    getPattern(id: number): Promise<Pattern> {
        const url = `${this.patternsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Pattern)
            .catch(this.handleError);
    }

    update(pattern: Pattern): Promise<Pattern> {
        const url = `${this.patternsUrl}/${pattern.id}`;
        return this.http
            .put(url, JSON.stringify(pattern), {headers: this.headers})
            .toPromise()
            .then(() => pattern)
            .catch(this.handleError);
    }

    create(name: string): Promise<Pattern> {
        return this.http
            .post(this.patternsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.patternsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}
