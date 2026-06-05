import React from "react";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div
      style={{
  background:
  "radial-gradient(circle at 70% 30%, rgba(160,70,20,.28), transparent 35%), linear-gradient(180deg, #160604 0%, #050303 75%)",
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
    minHeight: 175,
    backgroundImage: "url('/egyptianheader.png')",
    backgroundSize: "100% auto",
  backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    borderBottom: "1px solid rgba(214,169,77,.65)",
    display: "flex",
    alignItems: "flex-end",
  }}
>
  <div
    style={{
      width: "100%",
     background:
  "linear-gradient(90deg, rgba(0,0,0,.55), rgba(0,0,0,.35), rgba(0,0,0,.55))",
      borderTop: "1px solid rgba(214,169,77,.25)",
    }}
  >
    <div
      style={{
        maxWidth: 1380,
        margin: "0 auto",
        padding: "12px 34px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 30,
      }}
    >
      <a href="/" style={{ textDecoration: "none" }}>
        <div>
          <div
            style={{
              fontFamily: "Cinzel, serif",
             fontSize: "clamp(28px, 3vw, 48px)",
              fontWeight: 700,
              color: "#e4c16f",
              lineHeight: 0.9,
              letterSpacing: 1,
              textShadow: "0 2px 8px rgba(0,0,0,.9)",
            }}
          >
            YugiHurrell
          </div>

          <div
            style={{
              color: "#d6a94d",
             letterSpacing: 6,
fontSize: 11,
marginTop: 4,
              textAlign: "center",
              textTransform: "uppercase",
              textShadow: "0 2px 6px rgba(0,0,0,.9)",
            }}
          >
            Collectibles
          </div>
        </div>
      </a>

      <nav
        style={{
          display: "flex",
          gap: 34,
          alignItems: "center",
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          fontSize: 16,
          textShadow: "0 2px 8px rgba(0,0,0,.85)",
        }}
      >
        <a href="#shop" style={{ color: "#f5efe2", textDecoration: "none" }}>
          Shop
        </a>
        <a href="#live" style={{ color: "#f5efe2", textDecoration: "none" }}>
          Live Shows
        </a>
        <a href="#sell" style={{ color: "#f5efe2", textDecoration: "none" }}>
          Sell / Trade
        </a>
        <a href="#contact" style={{ color: "#f5efe2", textDecoration: "none" }}>
          Contact
        </a>
      </nav>
    </div>
  </div>
</header>

      <main>
       <section
  style={{
    padding: "90px 24px",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.78), rgba(0,0,0,.84)), url('/yugihero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderTop: "1px solid rgba(214,169,77,.25)",
    borderBottom: "1px solid rgba(214,169,77,.25)",
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
    padding: "10px 28px",
    background:
      "linear-gradient(180deg, rgba(93,55,12,.95), rgba(58,33,7,.95))",
    border: "1px solid rgba(214,169,77,.8)",
    color: "#e4c16f",
    fontFamily: "Cinzel, serif",
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    position: "relative",
    boxShadow: "0 0 18px rgba(214,169,77,.15)",
    clipPath:
      "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
  }}
>
   𓂀 Trading Cards • Slabs • Sealed Product 𓂀
</div>
              <h1
                style={{
  fontSize: "clamp(44px, 6vw, 78px)",
  lineHeight: 1.08,
  marginTop: 24,
  marginBottom: 20,
  fontFamily: "Cinzel, serif",
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "#f5efe2",
  textShadow: "0 4px 18px rgba(0,0,0,.75)",
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
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
  <a
    href="#shop"
    style={{
      display: "inline-block",
      padding: "15px 26px",
      borderRadius: 6,
      background: "linear-gradient(90deg, #b9822b, #e0b85c)",
      color: "black",
      fontWeight: 700,
      textDecoration: "none",
      letterSpacing: 1,
    }}
  >
    BROWSE SHOP →
  </a>

  <a
    href="#sell"
    style={{
      display: "inline-block",
      padding: "15px 26px",
      borderRadius: 6,
      border: "1px solid rgba(214,169,77,.75)",
      color: "#d6a94d",
      fontWeight: 700,
      textDecoration: "none",
      letterSpacing: 1,
    }}
  >
    SELL YOUR COLLECTION
  </a>
</div>
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
    : item.title === "Single Cards"
    ? "/singles.html"
    : "/accessories.html"
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
  style={{
    maxWidth: 1180,
    margin: "0 auto",
    padding: "60px 24px",
  }}
>
  <h2 style={{ fontSize: 42 }}>Latest From Instagram</h2>

  <p
    style={{
      color: "#a1a1aa",
      marginBottom: 30,
    }}
  >
    Recent stock arrivals, graded slabs, collector singles and live show updates.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: 20,
    }}
  >
    <a
      href="https://www.instagram.com/yugihurrell"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="/insta1.png"
        alt="Instagram Post"
        style={{
          width: "100%",
          borderRadius: 20,
        }}
      />
    </a>

    <a
      href="https://www.instagram.com/yugihurrell"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="/insta2.png"
        alt="Instagram Post"
        style={{
          width: "100%",
          borderRadius: 20,
        }}
      />
    </a>

    <a
      href="https://www.instagram.com/yugihurrell"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="/insta3.png"
        alt="Instagram Post"
        style={{
          width: "100%",
          borderRadius: 20,
        }}
      />
    </a>
  </div>

  <div style={{ marginTop: 30 }}>
    <a
      href="https://www.instagram.com/yugihurrell"
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-block",
        padding: "14px 22px",
        borderRadius: 999,
        background: "#d6a94d",
        color: "black",
        fontWeight: 700,
        textDecoration: "none",
      }}
    >
      Follow @YugiHurrell
    </a>
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
