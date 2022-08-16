import Context from "../context/CalendarContext";
import ModalContext from '../context/ModalContext'

import { useSession, signOut } from "next-auth/react";

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Calendar from '../components/calendar/Calendar'
import NewEventModal from "../components/calendar/NewEvent/NewEventModal";
import EventInfoModal from '../components/Modals/EventInfoModal'
import NewCalendarModal from '../components/Modals/NewCalendarModal'
import NewNoteModal from "../components/Modals/NewNoteModal";
import NoteReadingModal from "../components/Modals/NoteReadingModal"
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  return (
    <Context>
      <ModalContext>

        <div className={styles.container}>
          <Head>
            <title>Cedule | Your Schedule</title>
            <meta name="description" content="Calendar events and tasks application" />
            <link rel="icon" href="/favicon.ico" />

          </Head>


          <main className={styles.main}>
            {session ? <button onClick={() => { signOut() }}>LOGOUT</button> : <button onClick={() => {
              router.push("/api/auth/signin")
            }}>LOGIN</button>}
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



export default Home
