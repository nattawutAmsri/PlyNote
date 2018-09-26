import { UUID } from 'angular2-uuid';
export class NoteModel {
    title: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    sync: number;
    hashValue: string;

    constructor(values: Object = {}) {
        if(values) {
            Object.assign(this, values);
        } else {
            this.title = '';
            this.note = '';
            this.createdAt = new Date();
            this.sync = 0;
            this.hashValue = UUID.UUID();
        }
    }

    validate(val: this){
        if(!val.title)return false;
        if(!val.note) return false;
        if(!val.hashValue) return false;        
    }
}