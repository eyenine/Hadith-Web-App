import { useState, useMemo, useEffect } from "react";

/* ── Google Fonts ── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Sans+Bengali:wght@400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ══════════════════════════════════════════════
   GEOMETRIC PATTERN (SVG background)
══════════════════════════════════════════════ */
const GeometricBg = ({ opacity = 0.04 }) => (
  <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="geo" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon points="40,4 76,22 76,58 40,76 4,58 4,22"
          fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity={opacity * 10} />
        <line x1="40" y1="4"  x2="40" y2="76" stroke="#C9A84C" strokeWidth="0.3" opacity={opacity * 8} />
        <line x1="4"  y1="40" x2="76" y2="40" stroke="#C9A84C" strokeWidth="0.3" opacity={opacity * 8} />
        <circle cx="40" cy="40" r="8" fill="none" stroke="#C9A84C" strokeWidth="0.4" opacity={opacity * 12} />
        <circle cx="40" cy="40" r="2" fill="#C9A84C" opacity={opacity * 15} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#geo)" />
  </svg>
);

/* ══════════════════════════════════════════════
   GRADE BADGE
══════════════════════════════════════════════ */
const GradeBadge = ({ grade }) => {
  const col = grade === "Sahih" ? "#4BC996"
    : grade === "Hasan Sahih" ? "#4B9FC9"
    : "#C9A84C";
  return (
    <span style={{
      fontSize:10, fontWeight:600, letterSpacing:"0.08em",
      background: col + "22", color: col,
      border: `1px solid ${col}44`,
      borderRadius:4, padding:"2px 8px",
      fontFamily:"'Lora', serif", textTransform:"uppercase"
    }}>{grade}</span>
  );
};

/* ══════════════════════════════════════════════
   HADITH CARD
══════════════════════════════════════════════ */
const HadithCard = ({ h, collections, topics, langMode, dark, bookmarks, onBookmark, onOpen }) => {
  const col = collections.find(c => c.id === h.collection);
  const topic = topics.find(t => t.id === h.topic);
  const isBookmarked = bookmarks.includes(h.id);
  const [hovered, setHovered] = useState(false);

  const bg   = dark ? (hovered ? "#1E3D32" : "#172E25") : (hovered ? "#FFFDF5" : "#FFFFFF");
  const bord = dark ? (hovered ? "#3A6A54" : "#243D31") : (hovered ? "#C9A84C" : "#E8DFC0");

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: bg, border: `1px solid ${bord}`,
        borderRadius:16, padding:"24px",
        cursor:"pointer", transition:"all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered
          ? (dark ? "0 12px 40px #00000060, 0 0 0 1px #C9A84C33" : "0 12px 40px #0000001A, 0 0 0 1px #C9A84C44")
          : (dark ? "0 2px 12px #00000040" : "0 2px 12px #0000000E"),
        position:"relative", overflow:"hidden",
      }}>
      <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%",
        background: col?.color, borderRadius:"3px 0 0 3px" }} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <span style={{
            fontSize:11, fontWeight:600, color: col?.color,
            background: col?.color + "18",
            border: `1px solid ${col?.color}33`,
            borderRadius:20, padding:"3px 10px", letterSpacing:"0.06em"
          }}>{col?.short}</span>
          <span style={{
            fontSize:11, color: dark ? "#7A9E8A" : "#7A8A6A",
            background: dark ? "#1F3A2C" : "#F0EBD8",
            borderRadius:20, padding:"3px 10px"
          }}>#{h.number}</span>
          <GradeBadge grade={h.grade} />
        </div>
        <button onClick={(e) => { e.stopPropagation(); onBookmark(h.id); }}
          style={{
            background:"none", border:"none", cursor:"pointer",
            fontSize:20, lineHeight:1, padding:4,
            color: isBookmarked ? "#C9A84C" : (dark ? "#3A5A48" : "#C0B890"),
            transition:"all 0.2s",
            transform: isBookmarked ? "scale(1.2)" : "scale(1)",
          }}>
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>

      <div onClick={() => onOpen(h)}
        style={{
          fontFamily:"'Amiri', serif", fontSize:20, lineHeight:1.9,
          textAlign:"right", direction:"rtl",
          color: dark ? "#E8D8A8" : "#5A3A0A",
          marginBottom:16, padding:"12px 0",
          borderBottom: `1px solid ${dark ? "#2A4538" : "#E8DFC0"}`,
        }}>{h.arabic}</div>

      <div onClick={() => onOpen(h)} style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {(langMode === "en" || langMode === "both") && (
          <p style={{
            fontFamily:"'Lora', serif", fontSize:14, lineHeight:1.75,
            color: dark ? "#C8D8C0" : "#2A3A2A", margin:0
          }}>
            <span style={{ color:"#C9A84C", fontWeight:600, fontSize:11, marginRight:6 }}>EN</span>
            {h.english}
          </p>
        )}
        {(langMode === "bn" || langMode === "both") && (
          <p style={{
            fontFamily:"'Noto Sans Bengali', sans-serif", fontSize:14, lineHeight:1.85,
            color: dark ? "#B8C8B4" : "#3A4A3A", margin:0
          }}>
            <span style={{ color:"#C9A84C", fontWeight:600, fontSize:11, marginRight:6 }}>BN</span>
            {h.bengali}
          </p>
        )}
      </div>

      <div style={{
        marginTop:14, paddingTop:12,
        borderTop: `1px solid ${dark ? "#2A4538" : "#E8DFC0"}`,
        display:"flex", justifyContent:"space-between", alignItems:"center"
      }}>
        <span style={{ fontSize:12, color: dark ? "#5A8A6A" : "#8A9A7A", fontStyle:"italic" }}>
          — {h.narrator}
        </span>
        <span style={{ fontSize:11, color: dark ? "#3A6A4A" : "#A0B090" }}>
          {topic?.icon} {topic?.name}
        </span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */
const Modal = ({ h, collections, topics, dark, bookmarks, onBookmark, onClose }) => {
  if (!h) return null;
  const col = collections.find(c => c.id === h.collection);
  const topic = topics.find(t => t.id === h.topic);
  const isBookmarked = bookmarks.includes(h.id);
  const bg   = dark ? "#0E2219" : "#FFFDF5";
  const bord = dark ? "#2A4838" : "#D4C898";

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"#00000090",
      backdropFilter:"blur(8px)", display:"flex",
      alignItems:"center", justifyContent:"center",
      zIndex:1000, padding:20, animation:"fadeIn 0.2s ease"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: bg, border:`1px solid ${bord}`,
        borderRadius:20, padding:32, maxWidth:640, width:"100%",
        maxHeight:"90vh", overflowY:"auto",
        boxShadow:"0 40px 80px #00000060",
        position:"relative", animation:"slideUp 0.25s ease"
      }}>
        <GeometricBg opacity={0.02} />

        <button onClick={onClose} style={{
          position:"absolute", top:16, right:16,
          background: dark ? "#1A3228" : "#F0EBD8",
          border:`1px solid ${bord}`, borderRadius:8,
          width:32, height:32, cursor:"pointer",
          color: dark ? "#7A9E8A" : "#6A7A6A",
          fontSize:16, display:"flex", alignItems:"center", justifyContent:"center"
        }}>✕</button>

        <div style={{ display:"flex", gap:8, marginBottom:20, alignItems:"center" }}>
          <span style={{
            background: col?.color + "22", color: col?.color,
            border:`1px solid ${col?.color}44`,
            borderRadius:20, padding:"4px 14px",
            fontSize:12, fontWeight:600, letterSpacing:"0.06em"
          }}>{col?.name}</span>
          <span style={{ fontSize:12, color: dark ? "#5A8A6A" : "#8A9A7A" }}>Hadith #{h.number}</span>
          <GradeBadge grade={h.grade} />
        </div>

        <div style={{
          fontFamily:"'Amiri', serif", fontSize:26, lineHeight:2.1,
          textAlign:"right", direction:"rtl",
          color: dark ? "#E8D8A8" : "#4A2A08",
          background: dark ? "#132A1E" : "#FBF5E0",
          borderRadius:12, padding:"20px 24px",
          border:`1px solid ${dark ? "#2A4838" : "#E0D4A0"}`,
          marginBottom:20
        }}>{h.arabic}</div>

        <div style={{
          background: dark ? "#142A20" : "#F8F5E8",
          borderRadius:10, padding:"16px 20px", marginBottom:12,
          border:`1px solid ${dark ? "#243D30" : "#E8DFC0"}`
        }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#C9A84C", letterSpacing:"0.1em", marginBottom:8 }}>
            ENGLISH TRANSLATION
          </div>
          <p style={{
            fontFamily:"'Lora', serif", fontSize:15, lineHeight:1.8,
            color: dark ? "#C0D8B8" : "#2A3A2A", margin:0
          }}>{h.english}</p>
        </div>

        <div style={{
          background: dark ? "#142A20" : "#F8F5E8",
          borderRadius:10, padding:"16px 20px", marginBottom:20,
          border:`1px solid ${dark ? "#243D30" : "#E8DFC0"}`
        }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#C9A84C", letterSpacing:"0.1em", marginBottom:8 }}>
            বাংলা অনুবাদ
          </div>
          <p style={{
            fontFamily:"'Noto Sans Bengali', sans-serif", fontSize:15, lineHeight:1.95,
            color: dark ? "#B0C8A8" : "#2A3A2A", margin:0
          }}>{h.bengali}</p>
        </div>

        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"14px 0 0", borderTop:`1px solid ${dark ? "#2A4838" : "#E8DFC0"}`
        }}>
          <div>
            <div style={{ fontSize:12, color: dark ? "#5A8A6A" : "#7A8A6A", marginBottom:2 }}>Narrator</div>
            <div style={{ fontSize:14, fontStyle:"italic", color: dark ? "#A0C0A8" : "#3A4A3A" }}>{h.narrator}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:12, color: dark ? "#5A8A6A" : "#7A8A6A", marginBottom:2 }}>Topic</div>
            <div style={{ fontSize:14, color: dark ? "#A0C0A8" : "#3A4A3A" }}>{topic?.icon} {topic?.name} / {topic?.namebn}</div>
          </div>
        </div>

        <button onClick={() => onBookmark(h.id)} style={{
          marginTop:16, width:"100%", padding:"12px",
          background: isBookmarked ? "#C9A84C22" : (dark ? "#1A3228" : "#F0EBD8"),
          border:`1px solid ${isBookmarked ? "#C9A84C" : bord}`,
          borderRadius:10, cursor:"pointer",
          color: isBookmarked ? "#C9A84C" : (dark ? "#7A9E8A" : "#6A7A6A"),
          fontSize:14, fontFamily:"'Lora', serif",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          transition:"all 0.2s"
        }}>
          {isBookmarked ? "★ Bookmarked" : "☆ Add to Bookmarks"}
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [dataLoading, setDataLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [topics, setTopics] = useState([]);
  const [hadith, setHadith] = useState([]);

  const [page,            setPage]            = useState("home");
  const [activeTopic,     setActiveTopic]     = useState(null);
  const [activeCol,       setActiveCol]       = useState(null);
  const [selectedHadith,  setSelectedHadith]  = useState(null);
  const [bookmarks,       setBookmarks]       = useState([]);
  const [langMode,        setLangMode]        = useState("both");
  const [dark,            setDark]            = useState(true);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [searchActive,    setSearchActive]    = useState(false);
  
  const [displayLimit,    setDisplayLimit]    = useState(20);

  useEffect(() => {
    async function loadData() {
      try {
        const [colRes, topRes, hadRes] = await Promise.all([
          fetch('/data/collections.json'),
          fetch('/data/topics.json'),
          fetch('/data/hadiths.json')
        ]);
        
        const colData = await colRes.json();
        const topData = await topRes.json();
        const hadData = await hadRes.json();
        
        setCollections(colData);
        setTopics(topData);
        setHadith(hadData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setDataLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleBookmark = id =>
    setBookmarks(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id]);

  const filteredHadith = useMemo(() => {
    let list = hadith;
    if (activeTopic) list = list.filter(h => h.topic === activeTopic);
    if (activeCol)   list = list.filter(h => h.collection === activeCol);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(h =>
        h.english.toLowerCase().includes(q) ||
        h.bengali.includes(searchQuery) ||
        h.arabic.includes(searchQuery) ||
        h.narrator.toLowerCase().includes(q)
      );
    }
    return list;
  }, [hadith, activeTopic, activeCol, searchQuery]);

  const bookmarkedHadith = useMemo(() => 
    hadith.filter(h => bookmarks.includes(h.id)),
  [hadith, bookmarks]);

  // Reset display limit when filters change
  useEffect(() => {
    setDisplayLimit(20);
  }, [activeTopic, activeCol, searchQuery]);

  /* ── theme tokens ── */
  const T = {
    bg:        dark ? "#091A12" : "#F5F0E8",
    nav:       dark ? "#0D1F18" : "#FFFDF8",
    surface:   dark ? "#112219" : "#FFFDF5",
    card:      dark ? "#172E25" : "#FFFFFF",
    border:    dark ? "#243D30" : "#D4C898",
    gold:      "#C9A84C",
    goldLight: "#E8C86A",
    text:      dark ? "#EAE0C8" : "#1A2A1A",
    muted:     dark ? "#6A9A7A" : "#7A8A6A",
    green:     dark ? "#2A7A54" : "#1F6B4A",
    accent:    "#4BCCA8",
  };

  /* ── nav helper ── */
  const goPage = p => { setPage(p); setActiveTopic(null); setActiveCol(null); setSearchQuery(""); };

  if (dataLoading) {
    return (
      <div style={{
        minHeight: "100vh", background: T.bg, color: T.text, display: "flex", 
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'Lora', serif"
      }}>
        <GeometricBg opacity={0.05} />
        <div style={{ fontSize: 40, color: T.gold, marginBottom: 20, animation: "spin 2s linear infinite" }}>☪</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Loading HadithDB...</h2>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── nav bar ── */
  const Navbar = () => (
    <nav style={{
      position:"sticky", top:0, zIndex:100,
      background: T.nav + "F0",
      backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${T.border}`,
      padding:"0 24px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      height:64,
    }}>
      <div onClick={() => goPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{
          width:36, height:36, borderRadius:"50%",
          background:`radial-gradient(circle, ${T.gold}44, ${T.gold}11)`,
          border:`1.5px solid ${T.gold}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, color:T.gold
        }}>☪</div>
        <div>
          <div style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:18, fontWeight:700, color:T.gold, lineHeight:1
          }}>HadithDB</div>
          <div style={{ fontSize:10, color:T.muted, letterSpacing:"0.1em" }}>KUTUB AL-SITTAH</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:4 }}>
        {[
          { id:"home",      label:"Home" },
          { id:"topics",    label:"Topics" },
          { id:"browse",    label:"Browse" },
          { id:"bookmarks", label:`Saved (${bookmarks.length})` },
        ].map(n => (
          <button key={n.id} onClick={() => goPage(n.id)} style={{
            background: page === n.id ? T.gold + "22" : "none",
            border: page === n.id ? `1px solid ${T.gold}44` : "1px solid transparent",
            borderRadius:8, padding:"6px 14px", cursor:"pointer",
            fontSize:13, color: page === n.id ? T.gold : T.muted,
            fontFamily:"'Lora', serif", transition:"all 0.2s",
            fontWeight: page === n.id ? 600 : 400
          }}>{n.label}</button>
        ))}
      </div>

      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
        <button onClick={() => setSearchActive(s => !s)} style={{
          background: searchActive ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
          border:`1px solid ${searchActive ? T.gold : T.border}`,
          borderRadius:8, width:36, height:36, cursor:"pointer",
          color: searchActive ? T.gold : T.muted, fontSize:14,
          display:"flex", alignItems:"center", justifyContent:"center"
        }}>🔍</button>
        {["both","en","bn"].map(l => (
          <button key={l} onClick={() => setLangMode(l)} style={{
            background: langMode === l ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
            border:`1px solid ${langMode === l ? T.gold : T.border}`,
            borderRadius:6, padding:"4px 10px", cursor:"pointer",
            fontSize:11, fontWeight:600, letterSpacing:"0.06em",
            color: langMode === l ? T.gold : T.muted,
            transition:"all 0.2s"
          }}>{l.toUpperCase()}</button>
        ))}
        <button onClick={() => setDark(d => !d)} style={{
          background: dark ? "#1A3228" : "#EEE8D0",
          border:`1px solid ${T.border}`, borderRadius:8,
          width:36, height:36, cursor:"pointer",
          fontSize:16, color:T.muted,
          display:"flex", alignItems:"center", justifyContent:"center"
        }}>{dark ? "☀" : "🌙"}</button>
      </div>
    </nav>
  );

  /* ── search bar ── */
  const SearchBar = () => searchActive ? (
    <div style={{
      background: dark ? "#0F2219" : "#F0EBD8",
      borderBottom:`1px solid ${T.border}`,
      padding:"12px 24px"
    }}>
      <div style={{ maxWidth:700, margin:"0 auto", position:"relative" }}>
        <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:T.muted }}>🔍</span>
        <input
          autoFocus
          placeholder="Search hadith in English, বাংলা, or Arabic…"
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setPage("browse"); }}
          style={{
            width:"100%", background: dark ? "#132A1E" : "#FFFDF5",
            border:`1px solid ${searchQuery ? T.gold : T.border}`,
            borderRadius:10, padding:"10px 14px 10px 42px",
            color:T.text, fontSize:14, fontFamily:"'Lora', serif",
            outline:"none", boxSizing:"border-box",
            transition:"border 0.2s"
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} style={{
            position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
            background:"none", border:"none", cursor:"pointer", color:T.muted, fontSize:16
          }}>✕</button>
        )}
      </div>
    </div>
  ) : null;

  /* ══════════════════
     HOME PAGE
  ══════════════════ */
  const HomePage = () => (
    <div>
      <div style={{
        background: dark
          ? "linear-gradient(160deg, #091A12 0%, #0F2A1E 50%, #0A1E16 100%)"
          : "linear-gradient(160deg, #F5F0E8 0%, #EDE5CE 50%, #F0EBD8 100%)",
        padding:"80px 24px 60px",
        textAlign:"center", position:"relative", overflow:"hidden"
      }}>
        <GeometricBg opacity={0.035} />
        <div style={{
          width:120, height:120, borderRadius:"50%",
          background:`radial-gradient(circle at 35% 40%, ${T.gold}30, transparent 60%)`,
          border:`2px solid ${T.gold}55`,
          margin:"0 auto 24px",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:52, boxShadow:`0 0 60px ${T.gold}22`
        }}>☪</div>
        <h1 style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:"clamp(32px, 6vw, 56px)", fontWeight:900,
          color:T.gold, margin:"0 0 8px", lineHeight:1.1
        }}>Kutub al-Sittah</h1>
        <p style={{
          fontFamily:"'Amiri', serif", fontSize:22,
          color: dark ? "#7AA888" : "#5A7A5A", marginBottom:4
        }}>الكتب الستة</p>
        <p style={{
          fontFamily:"'Lora', serif", fontSize:16, color:T.muted,
          maxWidth:520, margin:"12px auto 32px", lineHeight:1.8
        }}>
          Explore the six most authentic hadith collections with English and Bengali translations, organized by topic.
        </p>
        <div style={{ display:"flex", justifyContent:"center", gap:40, flexWrap:"wrap" }}>
          {[
            { n:hadith.length, label:"Hadith" },
            { n:collections.length, label:"Collections" },
            { n:topics.length, label:"Topics" },
            { n:2, label:"Translations" },
          ].map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{
                fontFamily:"'Playfair Display', serif",
                fontSize:36, fontWeight:700, color:T.gold, lineHeight:1
              }}>{s.n}</div>
              <div style={{ fontSize:12, color:T.muted, letterSpacing:"0.08em", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:32, flexWrap:"wrap" }}>
          <button onClick={() => goPage("topics")} style={{
            background:`linear-gradient(135deg, ${T.gold}, #A88030)`,
            border:"none", borderRadius:10, padding:"12px 28px",
            color:"#1A1000", fontSize:14, fontWeight:700,
            fontFamily:"'Lora', serif", cursor:"pointer",
            boxShadow:`0 4px 20px ${T.gold}44`,
            transition:"transform 0.2s"
          }}>Browse by Topic →</button>
          <button onClick={() => goPage("browse")} style={{
            background: dark ? "#1A3228" : "#EEE8D0",
            border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 28px",
            color:T.text, fontSize:14, fontFamily:"'Lora', serif", cursor:"pointer",
            transition:"transform 0.2s"
          }}>All Hadith</button>
        </div>
      </div>

      <div style={{ padding:"48px 24px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:28 }}>
          <h2 style={{
            fontFamily:"'Playfair Display', serif", fontSize:24,
            color:T.text, margin:0, fontWeight:700
          }}>Browse by Topic</h2>
          <div style={{ flex:1, height:1, background:T.border }} />
        </div>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))",
          gap:12
        }}>
          {topics.map(t => {
            const count = hadith.filter(h => h.topic === t.id).length;
            return (
              <div key={t.id}
                onClick={() => { setActiveTopic(t.id); setPage("browse"); }}
                style={{
                  background: dark ? "#172E25" : "#FFFFFF",
                  border:`1px solid ${T.border}`,
                  borderRadius:12, padding:"18px 16px",
                  cursor:"pointer", textAlign:"center",
                  transition:"all 0.2s",
                }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{t.icon}</div>
                <div style={{
                  fontFamily:"'Playfair Display', serif",
                  fontSize:14, fontWeight:600, color:T.text, marginBottom:2
                }}>{t.name}</div>
                <div style={{
                  fontFamily:"'Noto Sans Bengali', sans-serif",
                  fontSize:12, color:T.muted, marginBottom:6
                }}>{t.namebn}</div>
                <div style={{
                  fontSize:11, background:T.gold+"22", color:T.gold,
                  borderRadius:20, padding:"2px 8px", display:"inline-block"
                }}>{count} hadith</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding:"0 24px 48px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:28 }}>
          <h2 style={{
            fontFamily:"'Playfair Display', serif", fontSize:24,
            color:T.text, margin:0, fontWeight:700
          }}>The Six Collections</h2>
          <div style={{ flex:1, height:1, background:T.border }} />
        </div>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",
          gap:14
        }}>
          {collections.map((col, i) => {
            const count = hadith.filter(h => h.collection === col.id).length;
            return (
              <div key={col.id}
                onClick={() => { setActiveCol(col.id); setPage("browse"); }}
                style={{
                  background: dark
                    ? `linear-gradient(135deg, #172E25, ${col.bg})`
                    : `linear-gradient(135deg, #FFFFFF, #F8F5E8)`,
                  border:`1px solid ${col.color}33`,
                  borderRadius:14, padding:"20px",
                  cursor:"pointer", transition:"all 0.2s",
                  position:"relative", overflow:"hidden"
                }}>
                <div style={{
                  position:"absolute", right:-10, top:-10,
                  width:80, height:80, borderRadius:"50%",
                  background: col.color + "18"
                }} />
                <div style={{
                  fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                  color: col.color, marginBottom:6
                }}>COLLECTION {i + 1}</div>
                <div style={{
                  fontFamily:"'Playfair Display', serif",
                  fontSize:16, fontWeight:700, color:T.text, marginBottom:4
                }}>{col.name}</div>
                <div style={{ fontSize:12, color:T.muted }}>{count} hadith included</div>
                <div style={{
                  marginTop:10, display:"inline-flex", alignItems:"center",
                  gap:6, fontSize:12, color:col.color
                }}>Browse →</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  /* ══════════════════
     TOPICS PAGE
  ══════════════════ */
  const TopicsPage = () => (
    <div style={{ padding:"40px 24px", maxWidth:1100, margin:"0 auto" }}>
      <h2 style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:28, fontWeight:700, color:T.text, marginBottom:8
      }}>All Topics</h2>
      <p style={{ color:T.muted, marginBottom:32, fontFamily:"'Lora', serif" }}>
        Select a topic to explore hadith from the six major collections.
      </p>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",
        gap:16
      }}>
        {topics.map(t => {
          const count = hadith.filter(h => h.topic === t.id).length;
          const cols = [...new Set(hadith.filter(h => h.topic === t.id).map(h => h.collection))];
          return (
            <div key={t.id}
              onClick={() => { setActiveTopic(t.id); setPage("browse"); }}
              style={{
                background: dark ? "#172E25" : "#FFFFFF",
                border:`1px solid ${T.border}`,
                borderRadius:14, padding:"24px",
                cursor:"pointer", transition:"all 0.2s",
              }}>
              <div style={{ fontSize:36, marginBottom:12 }}>{t.icon}</div>
              <div style={{
                fontFamily:"'Playfair Display', serif",
                fontSize:18, fontWeight:700, color:T.text, marginBottom:2
              }}>{t.name}</div>
              <div style={{
                fontFamily:"'Noto Sans Bengali', sans-serif",
                fontSize:14, color:T.muted, marginBottom:12
              }}>{t.namebn}</div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:10 }}>
                {cols.map(c => {
                  const col = collections.find(x => x.id === c);
                  return (
                    <span key={c} style={{
                      fontSize:10, background:col?.color+"22", color:col?.color,
                      borderRadius:4, padding:"1px 6px", fontWeight:600
                    }}>{col?.short}</span>
                  );
                })}
              </div>
              <div style={{ fontSize:12, color:T.gold }}>
                {count} hadith →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ══════════════════
     BROWSE PAGE
  ══════════════════ */
  const BrowsePage = () => {
    const currentTopic = topics.find(t => t.id === activeTopic);
    const currentCol   = collections.find(c => c.id === activeCol);
    
    // Pagination slicing
    const displayedHadith = filteredHadith.slice(0, displayLimit);
    const hasMore = displayLimit < filteredHadith.length;

    return (
      <div style={{ padding:"32px 24px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{
          display:"flex", gap:10, flexWrap:"wrap",
          marginBottom:24, alignItems:"center"
        }}>
          <div style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:20, fontWeight:700, color:T.text, marginRight:8
          }}>
            {searchQuery
              ? `Search: "${searchQuery}"`
              : currentTopic ? `${currentTopic.icon} ${currentTopic.name}`
              : currentCol  ? currentCol.name
              : "All Hadith"}
          </div>
          <div style={{ flex:1 }} />
          {(activeTopic || activeCol || searchQuery) && (
            <button onClick={() => { setActiveTopic(null); setActiveCol(null); setSearchQuery(""); }} style={{
              background:"none", border:`1px solid ${T.border}`,
              borderRadius:8, padding:"6px 12px", cursor:"pointer",
              fontSize:12, color:T.muted, fontFamily:"'Lora', serif"
            }}>✕ Clear filters</button>
          )}
          <div style={{ fontSize:13, color:T.muted }}>
            {filteredHadith.length} hadith
          </div>
        </div>

        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
          <button onClick={() => setActiveTopic(null)} style={{
            background: !activeTopic ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
            border:`1px solid ${!activeTopic ? T.gold+"44" : T.border}`,
            borderRadius:20, padding:"5px 14px", cursor:"pointer",
            fontSize:12, color: !activeTopic ? T.gold : T.muted,
            fontFamily:"'Lora', serif"
          }}>All Topics</button>
          {topics.map(t => (
            <button key={t.id} onClick={() => setActiveTopic(t.id === activeTopic ? null : t.id)} style={{
              background: activeTopic === t.id ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
              border:`1px solid ${activeTopic === t.id ? T.gold + "44" : T.border}`,
              borderRadius:20, padding:"5px 14px", cursor:"pointer",
              fontSize:12, color: activeTopic === t.id ? T.gold : T.muted,
              fontFamily:"'Lora', serif"
            }}>{t.icon} {t.name}</button>
          ))}
        </div>

        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:28 }}>
          <button onClick={() => setActiveCol(null)} style={{
            background: !activeCol ? "#4BCCA822" : (dark ? "#1A3228" : "#EEE8D0"),
            border:`1px solid ${!activeCol ? "#4BCCA844" : T.border}`,
            borderRadius:20, padding:"5px 14px", cursor:"pointer",
            fontSize:12, color: !activeCol ? "#4BCCA8" : T.muted,
            fontFamily:"'Lora', serif"
          }}>All Collections</button>
          {collections.map(col => (
            <button key={col.id} onClick={() => setActiveCol(col.id === activeCol ? null : col.id)} style={{
              background: activeCol === col.id ? col.color + "22" : (dark ? "#1A3228" : "#EEE8D0"),
              border:`1px solid ${activeCol === col.id ? col.color + "44" : T.border}`,
              borderRadius:20, padding:"5px 14px", cursor:"pointer",
              fontSize:12, color: activeCol === col.id ? col.color : T.muted,
              fontFamily:"'Lora', serif"
            }}>{col.short}</button>
          ))}
        </div>

        {filteredHadith.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:T.muted }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, marginBottom:8 }}>No hadith found</div>
            <div style={{ fontSize:14 }}>Try different filters or search terms.</div>
          </div>
        ) : (
          <>
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",
              gap:16
            }}>
              {displayedHadith.map(h => (
                <HadithCard key={h.id} h={h} collections={collections} topics={topics} langMode={langMode} dark={dark}
                  bookmarks={bookmarks} onBookmark={toggleBookmark}
                  onOpen={setSelectedHadith} />
              ))}
            </div>
            
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: 32 }}>
                <button onClick={() => setDisplayLimit(l => l + 20)} style={{
                  background: dark ? "#1A3228" : "#EEE8D0",
                  border: `1px solid ${T.border}`,
                  borderRadius: 10, padding: "12px 32px",
                  color: T.text, fontSize: 14, fontFamily: "'Lora', serif",
                  cursor: "pointer", transition: "all 0.2s"
                }}>
                  Load More Hadith
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  /* ══════════════════
     BOOKMARKS PAGE
  ══════════════════ */
  const BookmarksPage = () => (
    <div style={{ padding:"32px 24px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:28 }}>
        <h2 style={{
          fontFamily:"'Playfair Display', serif",
          fontSize:28, fontWeight:700, color:T.text, margin:0
        }}>★ Saved Hadith</h2>
        <span style={{ fontSize:14, color:T.muted }}>
          {bookmarkedHadith.length} saved
        </span>
      </div>
      {bookmarkedHadith.length === 0 ? (
        <div style={{ textAlign:"center", padding:"80px 0", color:T.muted }}>
          <div style={{ fontSize:48, marginBottom:16 }}>☆</div>
          <div style={{
            fontFamily:"'Playfair Display', serif", fontSize:22, color:T.text,
            marginBottom:8
          }}>No bookmarks yet</div>
          <p style={{ fontSize:14, maxWidth:320, margin:"0 auto 24px" }}>
            Tap the star icon on any hadith to save it here for quick reference.
          </p>
          <button onClick={() => goPage("browse")} style={{
            background:`linear-gradient(135deg, ${T.gold}, #A88030)`,
            border:"none", borderRadius:10, padding:"10px 24px",
            color:"#1A1000", fontSize:14, fontWeight:700,
            fontFamily:"'Lora', serif", cursor:"pointer"
          }}>Browse Hadith</button>
        </div>
      ) : (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",
          gap:16
        }}>
          {bookmarkedHadith.map(h => (
            <HadithCard key={h.id} h={h} collections={collections} topics={topics} langMode={langMode} dark={dark}
              bookmarks={bookmarks} onBookmark={toggleBookmark}
              onOpen={setSelectedHadith} />
          ))}
        </div>
      )}
    </div>
  );

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <div style={{
      minHeight:"100vh",
      background: T.bg,
      color: T.text,
      fontFamily:"'Lora', serif",
      transition:"background 0.3s, color 0.3s"
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(20px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#2A4838; border-radius:3px; }
        button:hover { opacity:0.85; }
      `}</style>

      <Navbar />
      <SearchBar />

      {page === "home"      && <HomePage />}
      {page === "topics"    && <TopicsPage />}
      {page === "browse"    && <BrowsePage />}
      {page === "bookmarks" && <BookmarksPage />}

      <Modal
        h={selectedHadith}
        collections={collections}
        topics={topics}
        dark={dark}
        bookmarks={bookmarks}
        onBookmark={toggleBookmark}
        onClose={() => setSelectedHadith(null)}
      />

      <footer style={{
        borderTop:`1px solid ${T.border}`,
        padding:"24px",
        textAlign:"center",
        background: dark ? "#091A12" : "#F0EBD8",
      }}>
        <div style={{ fontFamily:"'Amiri', serif", fontSize:18, color:T.gold, marginBottom:4 }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        <div style={{ fontSize:12, color:T.muted }}>
          HadithDB · Kutub al-Sittah · {hadith.length} hadith across {topics.length} topics
        </div>
      </footer>
    </div>
  );
}
