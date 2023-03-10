import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import RoomComponent from "@/components/RoomComponent";
import { getRooms } from "lib/database_handler";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {

  const id = parseInt(context.query.id);

  try {
    const room = await getRooms();

    return {
      props: {
        room: room,
      },
    };
  } catch (e) {
    console.log(e);
  }
}

export default function Home({ room }) {
  return (
    <>
      <Head>
        <title>Home Automation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          {room.map((_room) => (
            <RoomComponent
              key={_room.id}
              roomName={_room.name}
              roomID={_room.id}
            ></RoomComponent>
          ))}
        </div>

      </main>
    </>
  );
}
