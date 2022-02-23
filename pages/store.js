import { useEffect, useState } from "react";
import { fetchProperties } from "./utils/useStore";
import Navbar from "./components/Navbar";

export default function Store() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState("not-loaded");
  useEffect(() => {
    fetchProperties().then((items) => {
      setProperties(items);
      setLoading("loaded");
      console.log(properties);
    }).catch((error) => console.log(error));
  }, []);
  const onMouseEnterColor = (e) => e.target.style.backgroundColor = "#9241f3";
  const onMouseLeaveColor = (e) => e.target.style.backgroundColor = "#3b3545";
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
                {loading === "loaded" ? "No properties in marketplace." : "Loading..." }
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
                    }}/>
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
                    <div
                      style={{
                        padding: 4
                      }}>
                      <button
                        style={{
                          backgroundColor: "#3b3545",
                          color: "#ddd",
                          cursor: "pointer",
                          width: "100%",
                          borderRadius: 4,
                          fontWeight: "bold",
                          fontSize: 12,
                          paddingTop: 8,
                          paddingBottom: 8
                        }}
                        onMouseEnter={onMouseEnterColor}
                        onMouseLeave={onMouseLeaveColor}>
                          SELL PROPERTY
                      </button>
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
