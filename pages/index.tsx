// Contexts
import Context from "../context/CalendarContext";
import ModalContext from "../context/ModalContext";

// Next imports
import type { NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import dynamic from "next/dynamic";

import styles from "../styles/Home.module.css";

// Components
import Calendar from "../components/calendar/Calendar";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Dynamic imports of Modals
const NewNoteModal = dynamic(() => import("../components/Modals/NewNoteModal"));
const SettingsModal = dynamic(
  () => import("../components/Modals/SettingsModal")
);
const EventTypeChooserModal = dynamic(
  () => import("../components/Modals/EventTypeChooserModal")
);
const NoteReadingModal = dynamic(
  () => import("../components/Modals/NoteReadingModal")
);
const NewCalendarModal = dynamic(
  () => import("../components/Modals/NewCalendarModal")
);
const EventInfoModal = dynamic(
  () => import("../components/Modals/EventInfoModal")
);
const NewEventModal = dynamic(
  () => import("../components/calendar/NewEvent/NewEventModal")
);

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);
  return (
    <Context>
      <ModalContext>
        <div className={styles.container}>
          <Head>
            <title>Cedule | Your Schedule</title>
            <meta
              name="description"
              content="Calendar events and tasks application"
            />
          </Head>

          <main className={styles.main}>
            <SettingsModal />
            <NewEventModal />
            <EventInfoModal />
            <NewCalendarModal />
            <NewNoteModal />
            <NoteReadingModal />
            <EventTypeChooserModal />
            <Calendar />
          </main>
        </div>
      </ModalContext>
    </Context>
  );
};

Home.getInitialProps = async (context: NextPageContext) => {
  const { req, res } = context;
  const session = await getSession({ req });

  // console.log(res)
  if (!session && res) {
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
    return;
  }
  return {
    session: session,
  };
};

export default Home;
