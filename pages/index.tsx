import Context from "../context/CalendarContext";
import ModalContext from '../context/ModalContext'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Calendar from '../components/calendar/Calendar'
import NewEventModal from "../components/calendar/NewEvent/NewEventModal";
import EventInfoModal from '../components/Modals/EventInfoModal'
import NewCalendarModal from '../components/Modals/NewCalendarModal'


const Home: NextPage = ( ) => {


  return (
    <Context>
      <ModalContext>

        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />

          </Head>


          <main className={styles.main}>
            <NewEventModal />
            <EventInfoModal />
            <NewCalendarModal />
            <Calendar />
          </main>
        </div>

      </ModalContext>
    </Context>
  )
}



export default Home
