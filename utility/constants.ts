export const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const hours = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am",
  "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm",]

export const calendarColors = ["#73AB84",'#FF7F51',"#B4A0E5","#D5A021","#677DB7","#F4AFAB","#DBB3B1","#355834","#6B9AC4","#5B5941","#FFE66D","#827191"];


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

export const getTimeLabel = (timeStampId:number) => {
  return timeStamps[timeStampId].hour + ":" + (timeStamps[timeStampId].minute == 0 ? "00" : timeStamps[timeStampId].minute) + timeStamps[timeStampId].timeLabel;
}

export const NOTE_TAGS = [{
  id: 0,
  name: 'work',
},
{
  id: 1,
  name: 'school',
},

{
  id: 2,
  name: 'home',
},
{
  id: 3,
  name: 'other',
},
]




