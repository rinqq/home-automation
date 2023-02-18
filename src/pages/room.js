import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import SwitchComponent from "@/components/SwitchComponent";
import clientPromise from "lib/mongodb";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;

    const db = client.db("home-automation");

    const id = parseInt(context.query.id);

    const room = await db.collection("rooms").find({ id: id }).toArray();

    const items = await db
      .collection("items")
      .find({ roomID: id })
      .sort({ id: 1 })
      .toArray();

    return {
      props: {
        _items: JSON.parse(JSON.stringify(items)),
        room: JSON.parse(JSON.stringify(room)),
      },
    };
  } catch (e) {
    return console.log(e);
  }
}

export default function Room({ room, _items }) {
  return (
    <>
      <Head>
        <title>{room[0].roomName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: 24 }} className={inter.className}>
            {room[0].roomName}
          </h2>
          <div className={styles.grid}>
            {_items.map((item) => (
              <SwitchComponent
                currentState={item.currentState}
                itemID={item.itemName}
              ></SwitchComponent>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
