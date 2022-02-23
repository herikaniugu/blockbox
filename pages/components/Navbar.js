import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();
    const menu = ["Overview", "Marketplace", "Store", "Tokenize", "Creator"];
    const link = ["/", "/marketplace", "/store", "/tokenize", "/creator"];
    return (
        <header
            style={{
                display: "flex",
                paddingTop: 48,
                paddingLeft: 48,
                paddingRight: 48,
                paddingBottom: 24,
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "transparent",
                        width: "100%",
                        gap: 12,
                        flex: 1
                    }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 36,
                            height: 36
                        }}>
                        <div
                            style={{
                                backgroundColor: "#77b4ff",
                                transform: "rotate(45deg)",
                                width: 24,
                                height: 24
                            }}/>
                    </div>
                    <div
                        style={{
                            color: "#77b4ff",
                            backgroundColor: "transparent",
                            fontSize: 32
                        }}>
                        BLOCKBOX
                    </div>
                </div>
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        flex: 2
                    }}>
                    <div
                        style={{
                            display: "flex",
                            backgroundColor: "transparent",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        {
                            menu.map((value, id) => {
                                return (
                                    <Link
                                        key={id}
                                        href={link[id]}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flex: 1
                                        }}
                                        passHref>
                                        <div
                                            style={{
                                                backgroundColor: "transparent",
                                                color: "#969696",
                                                textTransform: "uppercase",
                                                cursor: "pointer",
                                                textDecoration: router.pathname == link[id] ? "underline" : "none",
                                                textUnderlineOffset: 8,
                                                fontSize: 14,
                                                margin: 20
                                            }}>
                                            {value}
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </nav>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        flex: 1
                    }}/>
            </div>
        </header>
    )
}
