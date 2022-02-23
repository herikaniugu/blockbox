import "../styles/globals.css"
import NextProgress from "nextjs-progressbar";
import Background from "./components/Background";
import Head from "next/head";

function Main({ Component, pageProps }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        height: "100%"
      }}>
      <Head>
        <title>Blockbox - Real Estate Tokenization</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1
        }}>
        <NextProgress/>
        <Component {...pageProps} />
      </div>
      <Background/>
    </div>
  )
}

export default Main;
