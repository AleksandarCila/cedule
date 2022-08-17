import Context from "../context/CalendarContext";
import ModalContext from '../context/ModalContext'


import type { NextPage } from 'next'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Calendar from '../components/calendar/Calendar'
import NewEventModal from "../components/calendar/NewEvent/NewEventModal";
import EventInfoModal from '../components/Modals/EventInfoModal'
import NewCalendarModal from '../components/Modals/NewCalendarModal'
import NewNoteModal from "../components/Modals/NewNoteModal";
import NoteReadingModal from "../components/Modals/NoteReadingModal"
import {getSession } from "next-auth/react";
import { NextPageContext } from "next";
import SettingsModal from "../components/Modals/SettingsModal";

const Home: NextPage = () => {
  
  return (
    <Context>
      <ModalContext>

        <div className={styles.container}>
          <Head>
            <title>Cedule | Your Schedule</title>
            <meta name="description" content="Calendar events and tasks application" />

          </Head>


          <main className={styles.main}>
            <SettingsModal />
            <NewEventModal />
            <EventInfoModal />
            <NewCalendarModal />
            <NewNoteModal />
            <NoteReadingModal />
            <Calendar />
          </main>
        </div>

      </ModalContext>
    </Context>
  )
}

Home.getInitialProps = async (context:NextPageContext) => {
  const { req, res } = context;
  const session = await getSession({ req });
  
  // console.log(res)
  if (!session && res) {
      res.writeHead(302, {
          Location: "/login"
      });
      res.end();
      return;
  }
  return {
      session: session,
  }
}


export default Home
