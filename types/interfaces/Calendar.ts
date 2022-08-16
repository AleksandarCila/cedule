import Event from './Event'

export default interface Calendar {
    id: number;
    user_id: number;
    name:string;
    color:string;
    visible:boolean;
    events: Event[];
  }