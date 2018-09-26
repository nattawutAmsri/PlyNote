import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotedbProvider } from '../../providers/notedb/notedb';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchText:string = '';
  notes:NoteModel[] = [];
  constructor(public navCtrl: NavController, private noteDB: NotedbProvider) {
    this.noteDB.allNote().then( notes => {
      this.notes = <NoteModel[]>notes;
    }).catch( err => {
      console.log(err);
    });
  }

  // html function
  searchNote() {
    console.log(this.searchText);
  }
}
