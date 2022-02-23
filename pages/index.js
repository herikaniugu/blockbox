import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      }}>
      <Navbar/>
      
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          overflowY: "scroll",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          paddingLeft: 48,
          paddingRight: 48,
          paddingBottom: 48
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9944ff",
            letterSpacing: 8,
            whiteSpace: 16,
            fontSize: 40
          }}>
          REAL ESTATE TOKENIZATION
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            letterSpacing: 2,
            whiteSpace: 2,
            marginTop: 36,
            fontSize: 16
          }}>
          Our mission is to make investments accessible, reliable and flexible to everyone.
        </div>
      </section>
    </div>
  )
}
