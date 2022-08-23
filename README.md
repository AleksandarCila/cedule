# Cedule | Your Schedule.

Cedule is a project for managing your schedule. It allows you to add different kind of activities (Events, Tasks, Reminders) to specific, custom created and color coded calendars. Beside activities and calendar, there is also a Notes panel where you can add Text Notes.

Visit the [Cedule](https://ceduleapp.com) webpage and try demo or register!

## Technology

This lightweight web app features a fully responsive design, making it possible to use on both desktop and mobile devices. It is also available to be installed on your mobile device as a PWA.

Core of this app is powered by [Next.js](https://nextjs.org) which enabled an easy setup for both frontend and API backend. Storing all the data is done via serverless-mysql which connects to a MySQL database hosted on a shared hosting. For Authentication and Session management, [next-auth](https://next-auth.js.org/) is used, which allowed me to easily protect API routes for non-authenticated users.

[MUI](https://mui.com/) Component library is used to quickly develop and customize the UI. 

In order to keep this app lightweight and fast, [date-fns](https://date-fns.org/) javascript library for date manipulation is used and it represents the core of this application.

Whole project was written in TypeScript.

## Features in the future

One of the main features that I would like to implement in this app, is to allow sync with most popular Calendar apps such as Google Calendar, Apple Calendar and Outlook. Beside that, sharing your calendars with other users is also planned as well as notifications.

## How to use

Web App consists of 3 main panels as seen on the screenshot below:

![image](https://user-images.githubusercontent.com/33640116/186255941-6a040e4b-6c47-44c6-a075-7bcfb4e5bd4b.png)

- Panel on the left (1) contains the list of your calendars, it allows you to show/hide all events of a calendar by clicking on the colored checkbox next to the calendars name. Calendars can be added, deleted and edited. Here you can also find a Settings button that allows you to Log Out. *In the future here you could change the Theme of the app, and do some configuration such as choosing Time Formats (12-hour or 24-hour)*
- Panel in the middle (2) is the main panel of the app. It displays your events and days in the format that you can choose in the top-right of the panel, by using radio buttons. There are 4 different views:

  - Month View: Whole month is shown, with weekends and days from other months styled differently in order to create an easy distinction.
  - Week View: 7-day week is shown as a grid, with hours of the day sitting on the y-axis and days of the week on the x-axis. Events are displayed according to their time, color, and calendars. Events can be dragged and edited. *At the moment dragging function works only on Mouse Events, not on Touch Events, this will be updated in the future*
  - Day View: Similar as the Week View but showing only 1 day. 
  - Notes View: This panel allows you to add quick notes.
 
 In the top-left you can use Today button to quickly selected Todays date. Left and Right arrow buttons are used to change Months, Week or Day. On the mobile version this is done with swiping left and right.

- Panel to the right (3) is the agenda panel. It shows all the events of the selected date separated by their type: Event, Task or Reminder, and with color that corresponds to the color of the calendar they belong to. Clicking on each event opens a Dialog Box that shows the details of the event.

#### Mobile Version

Mobile Version of the app contains the same functionalities but in different flow in order to fit everything on the smaller screen, but at the same time to make it easier for you to access it.

![image](https://user-images.githubusercontent.com/33640116/186258598-dedd3a52-88e0-49ef-a946-1d33a3874323.png)

Bottom-right SpeedDial Button is used to Add new Activities (Events, Tasks, Reminders or Notes). Two floating buttons on the left are used to access 1. and 3. panel accordingly. Clicking on any date in the month instantly opens the Agenda Drawer that slides from the right.
In the top-right corner you can find a combobox which is used to select the View (Month View, 3-Day View and Day View) and the button next to it leads you directly to Notes View. If you are in the Notes View, clicking on the ComboBox instantly takes you back to you Calendar Month View.


