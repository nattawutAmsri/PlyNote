import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';

import { CardComponent } from '../components/card/card';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NoteProvider } from '../providers/note/note';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConnectionProvider } from '../providers/connection/connection';
import { NotedbProvider } from '../providers/notedb/notedb';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoteProvider,
    // interceptor here
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    ConnectionProvider,
    SQLite,
    NotedbProvider,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
