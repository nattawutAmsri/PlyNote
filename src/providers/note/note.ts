import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConnectionProvider } from '../connection/connection';

// model
import { NoteModel } from '../../models/note.model';

@Injectable()
export class NoteProvider {
  baseUrl:string = 'http://localhost:8081/api/note/';
  isConnect:boolean = false;
  constructor(public http: HttpClient, private con: ConnectionProvider) {
    
  }

  public async getNotes() {
    let _url = this.baseUrl + 'all';

    return new Promise( (resolve, reject) => {
      this.http.get(_url).subscribe( notes => {
        resolve(notes);
      }, err => {
        reject(err)
      });
    });
  }

  public async addNote(note: NoteModel) {
    if(this.con.isConnected) {
      let _url = this.baseUrl + 'add';

      return new Promise( (resolve, reject) => {
        this.http.post(_url, note).subscribe( notes => {
          resolve(notes);
        }, err => {
          reject(err)
        });
      });
    }
  }

  public async getNote(hash: string) {

  }

  public async deleteNote(hash: string) {

  }
}
