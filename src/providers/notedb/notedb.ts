import { Injectable } from "@angular/core";
import { SQLiteObject, SQLite } from "@ionic-native/sqlite";
import { Platform } from "ionic-angular";

const DATA_BASE_NAME = "plynote.db";
const SQL_CREATE_NOTE_TABLE: string = "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title VARCHAR UNIQUE, note TEXT,sync INTEGER, hashValue VARCHAR, createdAt TEXT, updatedAt TEXT);";

@Injectable()
export class NotedbProvider {
  database: SQLiteObject;
  ready: Promise<void>;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.ready = this.platform
      .ready()
      .then(() => this.initializeDatabase())
      .then(() => this.bootstrapTables());
  }

  private bootstrapTables(): Promise<void> {
    return this.database.executeSql(SQL_CREATE_NOTE_TABLE).then(() => {
      console.log("Table boostrapped: " + SQL_CREATE_NOTE_TABLE);
    });
  }

  private initializeDatabase(): Promise<void> {
    return this.sqlite
      .create({
        name: DATA_BASE_NAME,
        location: "default"
      })
      .then((database: SQLiteObject) => {
        this.database = database;
        console.log("Database initialized");
      });
  }

  getDatabase(): Promise<SQLiteObject> {
    return this.ready.then(() => {
      return this.database;
    });
  }
}
