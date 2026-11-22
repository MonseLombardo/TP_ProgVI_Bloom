import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Tip } from './tip.interface';

@Injectable({
    providedIn: 'root'
})
export class TipsService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getTips(): Observable<Tip[]> {
        return this.http.get<Tip[]>(this.apiUrl);
    }
}