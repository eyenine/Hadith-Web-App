import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { bookmarks, langMode, setLangMode, dark, setDark, searchActive, setSearchActive, T } = useAppContext();
  const location = useLocation();

  const isPage = (path) => location.pathname === path;

  return (
    <nav style={{
      position:"sticky", top:0, zIndex:100,
      background: T.nav + "F0",
      backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${T.border}`,
      padding:"0 24px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      height:64,
    }}>
      <Link to="/" style={{ textDecoration: 'none', display:"flex", alignItems:"center", gap:10 }}>
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
      </Link>

      <div style={{ display:"flex", gap:4 }}>
        {[
          { path: "/", label: "Home" },
          { path: "/topics", label: "Topics" },
          { path: "/browse", label: "Browse" },
          { path: "/bookmarks", label: `Saved (${bookmarks.length})` },
        ].map(n => (
          <Link key={n.path} to={n.path} style={{
            textDecoration: 'none',
            background: isPage(n.path) ? T.gold + "22" : "none",
            border: isPage(n.path) ? `1px solid ${T.gold}44` : "1px solid transparent",
            borderRadius:8, padding:"6px 14px",
            fontSize:13, color: isPage(n.path) ? T.gold : T.muted,
            fontFamily:"'Lora', serif", transition:"all 0.2s",
            fontWeight: isPage(n.path) ? 600 : 400
          }}>
            {n.label}
          </Link>
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
}
