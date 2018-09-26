import { Injectable } from "@angular/core";
import { SQLiteObject, SQLite } from "@ionic-native/sqlite";
import { Platform } from "ionic-angular";
import { NoteModel } from "../../models/note.model";

const DATA_BASE_NAME = "plynote.db";
const SQL_CREATE_NOTE_TABLE: string = "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title VARCHAR, note TEXT,sync INTEGER, hashValue VARCHAR, createdAt TEXT, updatedAt TEXT);";
const SQL_SELECT_NOTE: string = "SELECT * FROM notes WHERE hashValue =?";
const SQL_SELECT_NOTE_ALL: string = "SELECT * FROM notes ORDER BY createdAt DESC";
const SQL_FIND_NOTE: string = "SELECT * FROM notes WHERE note=? ORDER BY createdAt DESC";
const SQL_DELETE_NOTE: string = "DELETE FROM notes WHERE hashValue =?";
const SQL_CREATE_NOTE: string = "INSERT INTO notes VALUES(NULL, ?,?,?,?,?,?)";
const SQL_UPDATE_NOTE: string = "UPDATE notes SET title=?,note=?,updateAd=? WHERE hashValue=?";

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

  public add(note: NoteModel) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .create({
          name: DATA_BASE_NAME,
          location: "default"
        })
        .then((db: SQLiteObject) => {
          db.executeSql(SQL_CREATE_NOTE, [note.title, note.note, note.sync,note.hashValue,note.createdAt,note.updatedAt])
            .then((resp) => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  public edit(note: NoteModel) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .create({
          name: DATA_BASE_NAME,
          location: "default"
        })
        .then((db: SQLiteObject) => {
          db.executeSql(SQL_UPDATE_NOTE, [note.title, note.note,note.updatedAt])
            .then((resp) => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  public getNote(hashValue: string) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .create({
          name: DATA_BASE_NAME,
          location: "default"
        })
        .then((db: SQLiteObject) => {
          db.executeSql(SQL_SELECT_NOTE, [hashValue])
            .then((resp) => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  public allNote() {
    return new Promise((resolve, reject) => {
      this.sqlite
        .create({
          name: DATA_BASE_NAME,
          location: "default"
        })
        .then((db: SQLiteObject) => {
          db.executeSql(SQL_SELECT_NOTE_ALL)
            .then((resp) => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  public findNote(key: string) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .create({
          name: DATA_BASE_NAME,
          location: "default"
        })
        .then((db: SQLiteObject) => {
          db.executeSql(SQL_FIND_NOTE, [key])
            .then((resp) => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  public deleteNote(hashValue: number) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .create({
          name: DATA_BASE_NAME,
          location: "default"
        })
        .then((db: SQLiteObject) => {
          db.executeSql(SQL_DELETE_NOTE, [hashValue])
            .then((resp) => {
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }
}
