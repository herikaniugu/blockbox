import { useState } from "react";
import { useRouter } from "next/router";
import { createMarket, onAttachement } from "./utils/useCreateItem";
import Navbar from "./components/Navbar";

export default function Tokenize() {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [input, setInput] = useState({ title: "", description: "", price: "" });
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
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 48,
                    paddingRight: 48,
                    paddingBottom: 48
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 640,
                        margin: 20
                    }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 12
                        }}>
                        {
                            image && (
                                <img width="320" src={image}/>
                            )
                        }
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 12
                        }}>
                        <input
                            type="text"
                            placeholder="Title"
                            spellCheck="false"
                            style={{
                                backgroundColor: "#120f1a",
                                border: "1px solid #3b3545",
                                caretColor: "white",
                                color: "#ddd",
                                width: "100%",
                                fontSize: 16,
                                padding: 12
                            }}
                            onChange={(e) => setInput({ ...input, title: e.target.value })}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 12
                        }}>
                        <input
                            type="text"
                            placeholder="Description"
                            spellCheck="false"
                            style={{
                                backgroundColor: "#120f1a",
                                border: "1px solid #3b3545",
                                caretColor: "white",
                                color: "#ddd",
                                width: "100%",
                                fontSize: 16,
                                padding: 12
                            }}
                            onChange={(e) => setInput({ ...input, description: e.target.value })}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 12
                        }}>
                        <input
                            type="text"
                            placeholder="Price"
                            spellCheck="false"
                            style={{
                                backgroundColor: "#120f1a",
                                border: "1px solid #3b3545",
                                caretColor: "white",
                                color: "#ddd",
                                width: "100%",
                                fontSize: 16,
                                padding: 12
                            }}
                            onChange={(e) => setInput({ ...input, price: e.target.value })}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 12
                        }}>
                        <input
                            type="file"
                            style={{
                                backgroundColor: "#120f1a",
                                border: "1px solid #3b3545",
                                caretColor: "white",
                                color: "#ddd",
                                width: "100%",
                                fontSize: 16,
                                padding: 12
                            }}
                            onChange={(e) => onAttachement(e).then((url) => setImage(url))}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 24
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
                                padding: 12
                            }}
                            onClick={(e) => createMarket(input, image).then(() => router.push("/"))}
                            onMouseEnter={onMouseEnterColor}
                            onMouseLeave={onMouseLeaveColor}>
                                TOKENIZE PROPERTY
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
