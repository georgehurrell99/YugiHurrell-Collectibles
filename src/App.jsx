import React from "react";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div
      style={{
        background:
  "radial-gradient(circle at center, rgba(120,45,10,.55), rgba(30,10,5,.95) 35%, #050303 70%), conic-gradient(from 180deg at center, #3b1608, #0b0503, #6b2a0c, #0b0503, #3b1608)",
backgroundBlendMode: "overlay",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
         background:
  "linear-gradient(90deg, rgba(20,8,4,.98), rgba(70,20,8,.96), rgba(20,8,4,.98))",
borderBottom: "1px solid rgba(214,169,77,.45)",
backgroundImage:
  "linear-gradient(90deg, rgba(214,169,77,.08) 1px, transparent 1px), linear-gradient(rgba(214,169,77,.08) 1px, transparent 1px)",
backgroundSize: "28px 28px",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>YugiHurrell</h2>
            <p
              style={{
                margin: 0,
                color: "#d6a94d",
                letterSpacing: 4,
                fontSize: 12,
              }}
            >
              COLLECTIBLES
            </p>
          </div>

          <nav
            style={{
              display: "flex",
              gap: 20,
              color: "#d4d4d8",
            }}
          >
            <a href="#shop">Shop</a>
            <a href="#live">Live Shows</a>
            <a href="#sell">Sell / Trade</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section
          style={{
            padding: "90px 24px",
            background: "linear-gradient(#2a0808,#050303,#000)",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 48,
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(127,29,29,.3)",
                  border: "1px solid rgba(248,113,113,.4)",
                  color: "#fde68a",
                }}
              >
                Trading cards, slabs & sealed product
              </div>

              <h1
                style={{
                  fontSize: "72px",
                  lineHeight: 1,
                  marginTop: 24,
                  marginBottom: 20,
                }}
              >
                For collectors, duellists and fans.
              </h1>

              <p
                style={{
                  color: "#d4d4d8",
                  fontSize: 18,
                  lineHeight: 1.8,
                }}
              >
                A UK-based collectibles brand specialising in Yu-Gi-Oh!
                sealed product, Graded slabs, collector singles and personal
                collection purchasing.
              </p>
            </motion.div>

            <div
              style={{
                border: "1px solid rgba(127,29,29,.55)",
               background: "rgba(16,7,7,.88)",
backdropFilter: "blur(4px)",
                borderRadius: 28,
                padding: 40,
                textAlign: "center",
              }}
            >
              <img
                src="/yugihurrell-logo.png"
                alt="YugiHurrell Collectibles"
               style={{
  width: "100%",
  maxWidth: 420,
  minWidth: 0,
  height: "auto",
  display: "block",
  margin: "0 auto",
  borderRadius: 24,
}}
              />
            </div>
          </div>
        </section>

        <section
          id="shop"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "60px 24px",
          }}
        >
          <h2 style={{ fontSize: 42 }}>Shop Categories</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
              marginTop: 30,
            }}
          >
            {[
  {
    title: "Sealed Product",
    items: [
      "Booster Boxes",
      "Booster Packs",
      "Tins",
      "Special Collections",
      "Accessories",
      "Pre-Orders",
    ],
  },
  {
    title: "Graded Slabs",
    items: [
  "PSA",
  "BGS",
  "CGC",
  "ACE",
  "TAG",
  "ARS",
],
  },
  {
    title: "Single Cards",
    items: [
      "Monster Cards",
      "Spell Cards",
      "Trap Cards",
      "Collector Rarities",
      "Quarter Century Rares",
      "Wanted List",
    ],
  },
  {
    title: "Accessories",
    items: [
      "Sleeves",
      "Binders",
      "Deck Boxes",
      "Top Loaders",
      "Storage",
      "Display Cases",
    ],
  },
].map((item) => (
           <a
  key={item.title}
  href={
    item.title === "Sealed Product"
      ? "/sealed.html"
      : item.title === "Graded Slabs"
      ? "/slabs.html"
      : "#"
  }
  style={{
    border: "1px solid rgba(127,29,29,.55)",
   background: "rgba(16,7,7,.88)",
backdropFilter: "blur(4px)",
    borderRadius: 24,
    padding: 24,
    textDecoration: "none",
    color: "white",
    display: "block",
    transition: "0.2s",
  }}
>
                <h3>{item.title}</h3>

<ul
  style={{
    marginTop: 12,
    paddingLeft: 18,
    color: "#a1a1aa",
    lineHeight: 1.8,
  }}
>
  {item.items.map((subItem) => (
    <li key={subItem}>{subItem}</li>
  ))}
</ul>
                <p style={{ color: "#a1a1aa" }}>
                  Browse or enquire about availability.
                </p>
              </a>
            ))}
          </div>
        </section>

        <section
          id="live"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "60px 24px",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(127,29,29,.55)",
              background: "rgba(16,7,7,.88)",
backdropFilter: "blur(4px)",
              borderRadius: 24,
              padding: 30,
            }}
          >
            <h2>Whatnot Live Shows</h2>

            <p style={{ color: "#a1a1aa" }}>
              Live breaks, auctions and events hosted through Whatnot.
            </p>

            <a
              href="https://www.whatnot.com/en-GB/user/yugihurrell"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: 20,
                padding: "14px 22px",
                borderRadius: 999,
                background: "#d6a94d",
                color: "black",
                fontWeight: 700,
              }}
            >
              Visit Whatnot
            </a>
          </div>
        </section>

        <section
          id="sell"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "60px 24px",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(127,29,29,.55)",
              background: "rgba(16,7,7,.88)",
backdropFilter: "blur(4px)",
              borderRadius: 24,
              padding: 30,
            }}
          >
         <h2>Sell Your Collection</h2>

<p style={{ color: "#a1a1aa" }}>
  Submit sealed product, slabs, binders and rare singles for review.
</p>
</div>
</section>
          
        <section
          id="contact"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "60px 24px",
            textAlign: "center",
          }}
        >
          <h2>Contact YugiHurrell Collectibles</h2>

          <p style={{ color: "#a1a1aa" }}>
            yugihurrell@gmail.com
          </p>
        </section>
      </main>
    </div>
  );
}
