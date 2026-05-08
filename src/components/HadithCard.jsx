import { useState } from "react";
import GradeBadge from "./GradeBadge";

export default function HadithCard({ h, collections, topics, langMode, dark, bookmarks, onBookmark, onOpen }) {
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
}
