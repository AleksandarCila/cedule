export default interface Event {
    id:number;
    calendar_id:number;
    type: 'event' | 'reminder' | 'task';
    name:string;
    description:string;
    color:string;
    allDay:boolean;
    eventDate: Date;
    eventStartTime:number;
    eventLength:number;
}