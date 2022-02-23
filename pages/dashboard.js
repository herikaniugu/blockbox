import { useEffect, useState } from "react";
import { fetchProperties } from "../utils/useDashboard";
import Navbar from "./components/Navbar";

export default function Creator() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState("not-loaded");
  useEffect(() => {
    fetchProperties().then((items) => {
      setProperties(items);
      setLoading("loaded");
    }).catch((error) => console.log(error));
  });
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
          width: "100%",
          height: "100%",
          paddingLeft: 48,
          paddingRight: 48,
          paddingBottom: 48
        }}>
        {
          !properties.length && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: 48
              }}>
              <div
                style={{
                  color: "#ddd",
                  fontSize: 20
                }}>
                {loading === "loaded" ? "No properties created." : "Loading..." }
              </div>
            </div>
          )
        }
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}>
          {
            properties.map((property, id) => {
              console.log(property);
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1a1923",
                    borderRadius: 8,
                    width: 240,
                    margin: 20
                  }}>
                  <div
                    style={{
                      position: "relative",
                      backgroundImage: `url('${property.image}')`,
                      backgroundSize: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      opacity: 0.9,
                      width: 240,
                      height: 240
                    }}>
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "#1a1923",
                        color: "#ddd",
                        textAlign: "center",
                        padding: 12,
                        zIndex: 1,
                        bottom: 12,
                        right: 12
                      }}>
                        {property.price} BNB
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 12
                    }}>
                    <div
                      style={{
                        fontSize: 16,
                        color: "#ddd",
                        padding: 4
                      }}>
                      {property.title}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        padding: 4,
                        color: "#aaa"
                      }}>
                      {property.description}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}
