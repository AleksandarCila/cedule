export default interface Note {
    id:number;
    user_id: number;
    title:string;
    content:string;
    date:Date;
}

export interface NoteTag {
    id:number;
    name:string;
}