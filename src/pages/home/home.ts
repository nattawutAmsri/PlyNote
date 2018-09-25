import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchText:string = '';
  textList = [];
  constructor(public navCtrl: NavController) {
    this.textList = [1,2,3,4,5,6,7];
  }

  // html function
  searchNote() {
    console.log(this.searchText);
  }
}
