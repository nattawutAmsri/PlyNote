import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network} from '@ionic-native/network';
/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectionProvider {

  constructor(public http: HttpClient, private network: Network) {

  }

  isConnected(): boolean {
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }

}
