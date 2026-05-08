import GeometricBg from "./GeometricBg";
import GradeBadge from "./GradeBadge";

export default function Modal({ h, collections, topics, dark, bookmarks, onBookmark, onClose }) {
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
}
