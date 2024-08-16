import Head from "next/head";
import Timeline from "@/components/Timeline";

export default function Home() {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <>
      <Head>
        <title>SNS Udemy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Timeline />
    </>
  )
}
