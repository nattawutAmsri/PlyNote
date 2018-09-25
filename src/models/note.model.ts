import { UUID } from 'angular2-uuid';
export class NoteModel {
    title: string;
    note: string;
    createDate: Date;
    sync: number;
    hashValue: string;

    constructor(values: Object = {}) {
        if(values) {
            Object.assign(this, values);
        } else {
            this.title = '';
            this.note = '';
            this.createDate = new Date();
            this.sync = 0;
            this.hashValue = UUID.UUID();
        }
    }
}