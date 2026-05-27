import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const Icon = ({ children, className = "", size = 24 }) => (
  <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    {children}
  </span>
);

const ShoppingBag = (props) => <Icon {...props}>🛍️</Icon>;
const ShieldCheck = (props) => <Icon {...props}>✅</Icon>;
const Star = (props) => <Icon {...props}>⭐</Icon>;
const Instagram = (props) => <Icon {...props}>📸</Icon>;
const Mail = (props) => <Icon {...props}>✉️</Icon>;
const Package = (props) => <Icon {...props}>📦</Icon>;
const Sparkles = (props) => <Icon {...props}>✨</Icon>;
const CreditCard = (props) => <Icon {...props}>💳</Icon>;

const fallbackInventory = [
  {
    name: "Blue-Eyes White Dragon",
    set: "Legend of Blue Eyes White Dragon",
    code: "LOB-001",
    rarity: "Ultra Rare",
    type: "Monster",
    condition: "Near Mint",
    price: 120,
    stock: 1,
    image: "",
  },
  {
    name: "Dark Magician",
    set: "Starter Deck: Yugi",
    code: "SDY-006",
    rarity: "Ultra Rare",
    type: "Monster",
    condition: "Light Play",
    price: 45,
    stock: 1,
    image: "",
  },
  {
    name: "Red-Eyes Black Dragon",
    set: "Metal Raiders",
    code: "MRD-018",
    rarity: "Ultra Rare",
    type: "Monster",
    condition: "Very Light Play",
    price: 80,
    stock: 1,
    image: "",
  },
  {
    name: "Ash Blossom & Joyous Spring",
    set: "Rarity Collection",
    code: "RA01-EN011",
    rarity: "Quarter Century Secret Rare",
    type: "Monster",
    condition: "Near Mint",
    price: 35,
    stock: 2,
    image: "",
  },
  {
    name: "Infinite Impermanence",
    set: "Rarity Collection",
    code: "RA01-EN078",
    rarity: "Secret Rare",
    type: "Trap",
    condition: "Near Mint",
    price: 10,
    stock: 4,
    image: "",
  },
  {
    name: "Super Polymerization",
    set: "Rarity Collection 5",
    code: "RA05-EN045",
    rarity: "Collector's Rare",
    type: "Spell",
    condition: "Near Mint",
    price: 20,
    stock: 1,
    image: "",
  },
];

const yugiHurrellInventory = fallbackInventory;

export default function YugiHurrellCollectiblesWebsite() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSet, setSelectedSet] = useState("All Sets");
  const [selectedRarity, setSelectedRarity] = useState("All Rarities");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [apiCards, setApiCards] = useState([]);
  const [apiStatus, setApiStatus] = useState("Preview fallback inventory active");
  const [showSinglesList, setShowSinglesList] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadYgoProDeckData() {
      try {
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
        if (!response.ok) throw new Error("YGOPRODeck request failed");
        const result = await response.json();

        const mappedCards = result.data.slice(0, 300).flatMap((card) => {
          const sets = card.card_sets || [];
          return sets.slice(0, 4).map((setInfo) => ({
            name: card.name,
            set: setInfo.set_name || "Unknown Set",
            code: setInfo.set_code || "N/A",
            rarity: setInfo.set_rarity || "Unknown Rarity",
            type: card.type?.includes("Spell") ? "Spell" : card.type?.includes("Trap") ? "Trap" : "Monster",
            condition: "Reference Only",
            price: Number(setInfo.set_price || 0),
            stock: 0,
            image: card.card_images?.[0]?.image_url_small || "",
            referenceOnly: true,
          }));
        });

        if (isMounted && mappedCards.length) {
          setApiCards(mappedCards);
          setApiStatus("YGOPRODeck reference data loaded");
        }
      } catch (error) {
        if (isMounted) setApiStatus("Preview fallback inventory active");
      }
    }

    loadYgoProDeckData();
    return () => {
      isMounted = false;
    };
  }, []);

  const cardDatabase = apiCards.length ? apiCards : yugiHurrellInventory;

  const setOptions = useMemo(() => ["All Sets", ...new Set(cardDatabase.map((card) => card.set))], [cardDatabase]);
  const rarityOptions = useMemo(() => ["All Rarities", ...new Set(cardDatabase.map((card) => card.rarity))], [cardDatabase]);
  const typeOptions = useMemo(() => ["All Types", ...new Set(cardDatabase.map((card) => card.type))], [cardDatabase]);
  const conditionOptions = ["All Conditions", "Damaged", "Played", "Light Play", "Very Light Play", "Near Mint", "Mint"];

  const filteredSingles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return cardDatabase.filter((card) => {
      const matchesSearch = `${card.name} ${card.set} ${card.code} ${card.rarity}`.toLowerCase().includes(term);
      const matchesSet = selectedSet === "All Sets" || card.set === selectedSet;
      const matchesRarity = selectedRarity === "All Rarities" || card.rarity === selectedRarity;
      const matchesType = selectedType === "All Types" || card.type === selectedType;
      const matchesCondition = selectedCondition === "All Conditions" || card.condition === selectedCondition;
      return matchesSearch && matchesSet && matchesRarity && matchesType && matchesCondition;
    });
  }, [searchTerm, selectedSet, selectedRarity, selectedType, selectedCondition, cardDatabase]);

  const visibleSingles = filteredSingles.slice(0, 40);
  const logoSrc = "/yugihurrell-logo.png";
  const fallbackLogo = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23d6b15e'/><stop offset='50%' stop-color='%238b5a2b'/><stop offset='100%' stop-color='%23efe2b0'/></linearGradient></defs>
  <rect width='500' height='500' rx='40' fill='%23050303'/>
  <circle cx='250' cy='250' r='190' fill='none' stroke='url(%23g)' stroke-width='8'/>
  <text x='250' y='235' font-size='72' text-anchor='middle' fill='url(%23g)' font-family='Arial Black'>YUGI</text>
  <text x='250' y='305' font-size='58' text-anchor='middle' fill='url(%23g)' font-family='Arial Black'>HURRELL</text>
  <text x='250' y='390' font-size='30' text-anchor='middle' fill='%23d6b15e' font-family='Arial'>COLLECTIBLES</text>
</svg>`;
  const featured = [
    {
      title: "Yu-Gi-Oh! Sealed Booster Boxes",
      desc: "Fresh sealed stock including modern sets, rarity collections and collector-focused releases.",
      tag: "Sealed Stock",
    },
    {
      title: "Graded Cards & Slabs",
      desc: "PSA and graded trading cards presented clearly with condition-focused photos.",
      tag: "Premium Cards",
    },
    {
      title: "Collector Singles",
      desc: "Hand-picked cards for collectors, players and investors looking for standout pieces.",
      tag: "Singles",
    },
  ];

  const steps = [
    "Submit photos of your cards, slabs or sealed collections.",
    "Provide condition details, quantities and your asking price.",
    "Receive a review and potential offer from YugiHurrell Collectibles.",
  ];

  return (
    <div className="min-h-screen bg-[#050303] text-white">
      <header className="sticky top-0 z-50 border-b border-red-950/50 bg-[#050303]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-2xl border border-amber-400/40 bg-black shadow-lg shadow-red-950/40">
              <img src={logoSrc} onError={(e) => { e.currentTarget.src = fallbackLogo; }} alt="YugiHurrell Collectibles logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-wide">YugiHurrell</p>
              <p className="text-xs uppercase tracking-[0.25em] text-red-300">Collectibles</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <a href="#shop" className="hover:text-red-300">Shop</a>
            <a href="#live" className="hover:text-red-300">Live Shows</a>
            <a href="#about" className="hover:text-red-300">About</a>
            <a href="#sell" className="hover:text-red-300">Sell / Trade</a>
            <a href="#contact" className="hover:text-red-300">Contact</a>
          </nav>
          <a href="#contact" className="rounded-full bg-gradient-to-r from-red-900 via-amber-500 to-stone-300 px-5 py-2 text-sm font-bold text-black transition hover:brightness-110">
            Enquire Now
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a0808] via-[#050303] to-black" />
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,120,40,0.18) 0 1px, transparent 1px), linear-gradient(135deg, rgba(148,32,32,0.18), transparent 45%)', backgroundSize: '34px 34px, 100% 100%' }} />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-950/40 px-4 py-2 text-sm text-amber-100">
                <Sparkles size={16} /> Trading cards, sealed stock & collector pieces
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                For collectors, duellists and fans.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                A UK-based collectibles brand specialising in Yu-Gi-Oh! sealed product, PSA slabs, collector singles and personal collection purchasing.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#shop" className="rounded-full bg-gradient-to-r from-red-900 via-amber-500 to-stone-300 px-7 py-4 text-center font-bold text-black transition hover:brightness-110">
                  View Shop
                </a>
                <a href="#sell" className="rounded-full border border-red-300/30 bg-black/30 px-7 py-4 text-center font-bold text-white transition hover:border-red-300 hover:text-red-200">
                  Submit Your Collection
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
              <div className="rounded-[2rem] border border-red-900/50 bg-black/40 p-3 shadow-2xl shadow-red-950/40 backdrop-blur">
                <img src={logoSrc} onError={(e) => { e.currentTarget.src = fallbackLogo; }} alt="YugiHurrell Collectibles logo" className="w-full rounded-[1.5rem] border border-amber-400/20 object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 grid gap-4 rounded-[2rem] border border-red-900/40 bg-[#0d0505] p-5 md:grid-cols-3">
            <a href="https://www.whatnot.com/en-GB/user/yugihurrell" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-red-300/50">
              <p className="text-sm uppercase tracking-[0.25em] text-red-300">Live Sales</p>
              <p className="mt-2 text-xl font-black">Whatnot</p>
              <p className="mt-2 text-sm text-zinc-400">Join live shows, auctions and stream events.</p>
            </a>
            <a href="https://www.ebay.co.uk/usr/YugiHurrell" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-red-300/50">
              <p className="text-sm uppercase tracking-[0.25em] text-red-300">Marketplace</p>
              <p className="mt-2 text-xl font-black">eBay Store</p>
              <p className="mt-2 text-sm text-zinc-400">Browse listed singles, slabs and sealed product.</p>
            </a>
            <a href="https://instagram.com/YugiHurrell" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-red-300/50">
              <p className="text-sm uppercase tracking-[0.25em] text-red-300">Community</p>
              <p className="mt-2 text-xl font-black">Instagram</p>
              <p className="mt-2 text-sm text-zinc-400">Follow new arrivals, stories and collection updates.</p>
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { Icon: ShieldCheck, title: "Trusted Stock", text: "Clear photos and honest descriptions." },
              { Icon: Package, title: "Tracked Delivery", text: "Secure UK shipping on every order." },
              { Icon: CreditCard, title: "Fair Pricing", text: "Market-aware pricing for collectors." },
              { Icon: Star, title: "Collector Focused", text: "Built by collectors, for collectors." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <Icon className="mb-4 text-red-300" size={28} />
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-300">Shop</p>
              <h2 className="mt-3 text-4xl font-black">Shop YugiHurrell Collectibles</h2>
            </div>
            <p className="max-w-xl text-zinc-400">Browse the main product categories below. Live shows are hosted separately through Whatnot, while listed items can be purchased through the shop/marketplace links.</p>
          </div>
          <div className="mb-10 rounded-[2rem] border border-red-300/20 bg-gradient-to-r from-yellow-950/40 to-zinc-900 p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-300">Latest Drops</p>
                <h3 className="mt-2 text-3xl font-black">New sealed releases & collector stock</h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-zinc-300">
                Modern booster boxes • PSA slabs • Collector singles
              </div>
            </div>
          </div>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            {[
              { title: "Sealed Product", text: "Booster boxes, new Yu-Gi-Oh! releases and sealed collector stock." },
              { title: "PSA Slabs", text: "Graded cards and premium display pieces for serious collectors." },
              { title: "Single Cards", text: "Collector singles, chase cards and standout individual cards." },
              { title: "Accessories", text: "Future sleeves, cases, storage and collector essentials." },
            ].map((cat) => (
              <div key={cat.title} className="rounded-[1.5rem] border border-red-950/50 bg-black/30 p-6">
                <p className="text-xl font-black">{cat.title}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{cat.text}</p>
                <a href="#contact" className="mt-5 inline-block text-sm font-bold text-red-300">Enquire</a>
              </div>
            ))}
          </div>
          <div className="mb-12 rounded-[2rem] border border-red-950/50 bg-[#100707] p-6 md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-300">Singles Finder</p>
                <h3 className="mt-2 text-3xl font-black">Search single cards by set and rarity</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">Use the filters below to search by card name, set, code, rarity and type. This is structured for YGOPRODeck reference data, while your own stock database will control price, condition and live availability.</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-red-300">{apiStatus}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className="rounded-full border border-red-300/30 px-5 py-2 text-sm font-bold text-red-100 transition hover:border-red-300 hover:text-red-300">
                  {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
                </button>
                <button onClick={() => { setSearchTerm(""); setSelectedSet("All Sets"); setSelectedRarity("All Rarities"); setSelectedType("All Types"); setSelectedCondition("All Conditions"); }} className="rounded-full border border-white/10 px-5 py-2 text-sm font-bold text-zinc-200 transition hover:border-red-300 hover:text-red-300">
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search card, code, set or rarity" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-red-300" />

              {showAdvancedFilters && (
                <div className="mt-4 grid gap-4 md:grid-cols-4">
                  <select value={selectedSet} onChange={(e) => setSelectedSet(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-red-300">
                    {setOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <select value={selectedRarity} onChange={(e) => setSelectedRarity(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-red-300">
                    {rarityOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-red-300">
                    {typeOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-red-300">
                    {conditionOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
                <span>{filteredSingles.length} cards found. Showing up to 40 when opened.</span>
                <button onClick={() => setShowSinglesList(!showSinglesList)} className="rounded-full bg-red-700 px-5 py-2 font-bold text-black transition hover:bg-red-600">
                  {showSinglesList ? "Hide Card List" : "Show Card List"}
                </button>
              </div>
            </div>

            {showSinglesList && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-6 bg-black/50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400">
                  <span className="col-span-2">Card</span>
                  <span>Set</span>
                  <span>Rarity</span>
                  <span>Condition</span>
                  <span className="text-right">Price / Status</span>
                </div>
                {visibleSingles.map((card) => (
                  <div key={`${card.name}-${card.set}-${card.rarity}-${card.code}`} className="grid grid-cols-6 border-t border-white/10 px-4 py-4 text-sm text-zinc-300">
                    <div className="col-span-2">
                      <p className="font-bold text-white">{card.name}</p>
                      <p className="text-xs text-zinc-500">{card.type} • {card.code} • {card.referenceOnly ? "Reference card" : `Stock: ${card.stock}`}</p>
                    </div>
                    <span>{card.set}</span>
                    <span>{card.rarity}</span>
                    <span>{card.condition}</span>
                    <span className="text-right font-bold text-red-300">{card.referenceOnly ? "Request Card" : `£${card.price}`}</span>
                  </div>
                ))}
                {filteredSingles.length === 0 && (
                  <div className="border-t border-white/10 px-4 py-8 text-center text-sm text-zinc-400">No cards matched your filters.</div>
                )}
                {filteredSingles.length > 40 && (
                  <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-zinc-500">Refine your search to narrow the list further.</div>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((item) => (
              <div key={item.title} className="group rounded-[2rem] border border-red-950/50 bg-[#100707] p-7 transition hover:-translate-y-1 hover:border-red-300/50">
                <span className="rounded-full bg-red-900/20 px-3 py-1 text-xs font-bold text-red-100">{item.tag}</span>
                <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-zinc-400">{item.desc}</p>
                <a href="https://www.ebay.co.uk/usr/YugiHurrell" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-bold text-red-300">
                  View / enquire <ShoppingBag size={18} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="live" className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-[2rem] border border-red-900/50 bg-[#100707] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-300">Live Shows</p>
                <h2 className="mt-3 text-4xl font-black">Watch YugiHurrell live on Whatnot.</h2>
                <p className="mt-5 text-lg leading-8 text-zinc-400">
                  Whatnot is used for live shows, auctions, live selling events and collector community streams — separate from the main shop section.
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
                <p className="text-2xl font-black">Live auctions & stream events</p>
                <p className="text-zinc-400">Follow the Whatnot profile to be notified when shows go live.</p>
                <a href="https://www.whatnot.com/en-GB/user/yugihurrell" target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-red-900 via-amber-500 to-stone-300 px-6 py-3 text-center font-bold text-black transition hover:brightness-110">Visit Whatnot Live Shows</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-300">About</p>
              <h2 className="mt-3 text-4xl font-black">Built for collectors who care about condition.</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-zinc-300">
              <p>
                YugiHurrell Collectibles is a UK-based trading card business focused on quality stock, transparent listings and a straightforward buying experience.
              </p>
              <p>
                Whether you are after sealed Yu-Gi-Oh! boxes, rare singles, graded slabs or future Pokémon and sports card drops, the aim is simple: reliable service and cards you are excited to own.
              </p>
            </div>
          </div>
        </section>

        <section id="sell" className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-300">Sell / Trade</p>
              <h2 className="mt-3 text-4xl font-black">Submit your collection for review.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">
                Collectors can submit personal collections, slabs, sealed cases, booster boxes and rare singles for review. We are actively looking to purchase Yu-Gi-Oh! collections, PSA slabs and sealed product.
              </p>
            </div>
            <div className="rounded-[2rem] border border-red-950/50 bg-[#100707] p-8">
              <h3 className="text-2xl font-black">How it works</h3>
              <div className="mt-6 space-y-5">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-700 font-black text-zinc-950">{index + 1}</div>
                    <p className="pt-1 text-zinc-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="rounded-[2rem] border border-red-300/20 bg-gradient-to-br from-red-900/30 to-white/[0.03] p-10 md:p-14">
            <h2 className="text-4xl font-black">Ready to buy, sell or ask about stock?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Contact YugiHurrell Collectibles for stock questions, collection reviews, sealed product enquiries or direct purchase discussions.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="mailto:yugihurrell@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-7 py-4 font-bold text-zinc-950 transition hover:bg-red-600">
                <Mail size={19} /> Email YugiHurrell
              </a>
              <a href="https://instagram.com/YugiHurrell" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-bold text-white transition hover:border-red-300 hover:text-red-300">
                <Instagram size={19} /> Instagram
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-300">
              <a href="https://www.whatnot.com/en-GB/user/yugihurrell" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-red-300 hover:text-red-300">Whatnot: yugihurrell</a>
              <a href="https://www.ebay.co.uk/usr/YugiHurrell" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-red-300 hover:text-red-300">eBay: YugiHurrell</a>
              <a href="mailto:yugihurrell@gmail.com" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-red-300 hover:text-red-300">yugihurrell@gmail.com</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} YugiHurrell Collectibles. Trading cards, sealed products and collector stock.
      </footer>
    </div>
  );
}
