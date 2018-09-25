import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import{ CONFIG} from '../../constants/index';

export class HomeService {
    url: string = CONFIG.API_URL + "/Sync/";

    constructor(private http:HttpClient) { 

    }

    addNote(note: string) {
        
    }

    removeNote(hashValue: string) {

    }

    updateNote(hashValue: string) {

    }
}