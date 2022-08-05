export const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const hours = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am",
  "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm",]

export const calendarColors = [];


Array.from({ length: 15 }).forEach(() => {
  calendarColors.push(faker.color.rgb({ prefix: '#' }));
})

let timeStampsArray = [];
let timeStampsId = 0;
for (let j = 0; j < 4; j++) {
  const hour = 12;
  const minute = j * 15;
  if (j == 0) timeStampsArray.push({ label: "12:00" + " am", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'am' });
  else timeStampsArray.push({ label: "12:" + j * 15 + " am", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'am' });
}
for (let i = 1; i < 12; i++) {
  const hour = i;
  for (let j = 0; j < 4; j++) {
    const minute = j * 15;
    if (j == 0) timeStampsArray.push({ label: i + ":00" + " am", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'am' });
    else timeStampsArray.push({ label: i + ":" + j * 15 + " am", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'am' });
  }
}
for (let j = 0; j < 4; j++) {
  const hour = 12;
  const minute = j * 15;
  if (j == 0) timeStampsArray.push({ label: "12:00" + " pm", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'pm' });
  else timeStampsArray.push({ label: "12:" + j * 15 + " pm", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'pm' });
}
for (let i = 1; i < 12; i++) {
  const hour = i;
  for (let j = 0; j < 4; j++) {
    const minute = j * 15;
    if (j == 0) timeStampsArray.push({ label: i + ":00" + " pm", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'pm' });
    else timeStampsArray.push({ label: i + ":" + j * 15 + " pm", hour: hour, minute: minute, id: timeStampsId++, timeLabel: 'pm' });
  }
}

export const timeStamps = timeStampsArray;

export const getTimeLabel = (timeStampId) => {
  return timeStamps[timeStampId].hour + ":" + (timeStamps[timeStampId].minute == 0 ? "00" : timeStamps[timeStampId].minute) + timeStamps[timeStampId].timeLabel;
}



import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

export const USERS = [];

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    eventDate: faker.date.soon(20), // '2022-02-11T05:14:39.138Z',
    eventType: faker.datatype.number({ min: 0, max: 2, precision: 1 }),
    eventStartTime: faker.datatype.number({ min: 0, max: 20, precision: 1 }),
    eventLength: faker.datatype.number({ min: 0, max: 10, precision: 1 })
  };
}

Array.from({ length: 100 }).forEach(() => {
  USERS.push(createRandomUser());
});





export function createRandomTask() {
  return {
    id: faker.datatype.uuid(),
    calendar_id: 'my_tasks',
    type: 'task',
    name: faker.internet.userName(),
    description: faker.datatype.string(),
    color: '#ffca3a',
    allDay: faker.datatype.boolean(),

    eventDate: faker.date.soon(20), // '2022-02-11T05:14:39.138Z',
    eventType: faker.datatype.number({ min: 0, max: 2, precision: 1 }),
    eventStartTime: faker.datatype.number({ min: 0, max: 20, precision: 1 }),
    eventLength: faker.datatype.number({ min: 0, max: 10, precision: 1 })
  };
}

export function createRandomEvent() {
  return {
    id: faker.datatype.uuid(),
    calendar_id: 'my_events',
    type: 'event',
    name: faker.internet.userName(),
    description: faker.datatype.string(),
    color: '#1982c4',
    allDay: faker.datatype.boolean(),

    eventDate: faker.date.soon(20), // '2022-02-11T05:14:39.138Z',
    eventType: faker.datatype.number({ min: 0, max: 2, precision: 1 }),
    eventStartTime: faker.datatype.number({ min: 0, max: 20, precision: 1 }),
    eventLength: faker.datatype.number({ min: 0, max: 10, precision: 1 })
  };
}

export function createRandomReminder() {
  return {
    id: faker.datatype.uuid(),
    calendar_id: 'my_reminders',
    type: 'reminder',
    name: faker.internet.userName(),
    description: faker.datatype.string(),
    color: '#ff595e',
    allDay: faker.datatype.boolean(),

    eventDate: faker.date.soon(20), // '2022-02-11T05:14:39.138Z',
    eventType: faker.datatype.number({ min: 0, max: 2, precision: 1 }),
    eventStartTime: faker.datatype.number({ min: 0, max: 20, precision: 1 }),
    eventLength: faker.datatype.number({ min: 0, max: 10, precision: 1 })
  };
}

export const events = [];

Array.from({ length: 10 }).forEach(() => {
  events.push(createRandomTask());
  events.push(createRandomEvent());
  events.push(createRandomReminder());
});

const calendarEvents = []
Array.from({ length: 10 }).forEach(() => {
  calendarEvents.push(createRandomEvent());
})

const calendarTasks = []
Array.from({ length: 10 }).forEach(() => {
  calendarTasks.push(createRandomTask());
})
const calendarReminders = []
Array.from({ length: 10 }).forEach(() => {
  calendarReminders.push(createRandomReminder());
})

export const calendars = [
  {
    id: 'my_events',
    name: 'Events',
    user_id: 'User',
    color: '#1982c4',
    visible: true,
    events: calendarEvents
  },
  {
    id: 'my_tasks',
    name: 'Tasks',
    user_id: 'User',
    color: '#ffca3a',
    visible: true,
    events: calendarTasks
  },
  {
    id: 'my_reminders',
    name: 'Reminders',
    user_id: 'User',
    color: '#ff595e',
    visible: true,
    events: calendarReminders
  },
];
