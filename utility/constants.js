export const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const hours = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am",
    "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm",]

let timeStampsArray = [];
let timeStampsId = 0;
for (let j = 0; j < 4; j++) {
    const hour = 12;
    const minute = j * 15;
    if (j == 0) timeStampsArray.push({ label: "12:00" + " am", hour: hour, minute: minute, id: timeStampsId++ });
    else timeStampsArray.push({ label: "12:" + j * 15 + " am", hour: hour, minute: minute, id: timeStampsId++ });
}
for (let i = 1; i < 12; i++) {
    const hour = i;
    for (let j = 0; j < 4; j++) {
        const minute = j * 15;
        if (j == 0) timeStampsArray.push({ label: i + ":00" + " am", hour: hour, minute: minute, id: timeStampsId++ });
        else timeStampsArray.push({ label: i + ":" + j * 15 + " am", hour: hour, minute: minute, id: timeStampsId++ });
    }
}
for (let i = 1; i < 12; i++) {
    const hour = i;
    for (let j = 0; j < 4; j++) {
        const minute = j * 15;
        if (j == 0) timeStampsArray.push({ label: i + ":00" + " pm", hour: hour, minute: minute, id: timeStampsId++ });
        else timeStampsArray.push({ label: i + ":" + j * 15 + " pm", hour: hour, minute: minute, id: timeStampsId++ });
    }
}

export const timeStamps = timeStampsArray;

import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

export const USERS = [];

export function createRandomUser(){
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    eventDate: faker.date.soon(20), // '2022-02-11T05:14:39.138Z',
    eventType:faker.datatype.number({ min: 0, max: 2, precision: 1 }),
    eventStartTime: faker.datatype.number({ min: 0, max: 20, precision: 1 }),
    eventLength: faker.datatype.number({ min: 0, max: 10, precision: 1 })
  };
}

Array.from({ length: 100 }).forEach(() => {
  USERS.push(createRandomUser());
});