import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import GeometricBg from "../components/GeometricBg";

export default function HomePage() {
  const { hadith, collections, topics, dark, T } = useAppContext();
  const navigate = useNavigate();

  return (
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
          <button onClick={() => navigate("/topics")} style={{
            background:`linear-gradient(135deg, ${T.gold}, #A88030)`,
            border:"none", borderRadius:10, padding:"12px 28px",
            color:"#1A1000", fontSize:14, fontWeight:700,
            fontFamily:"'Lora', serif", cursor:"pointer",
            boxShadow:`0 4px 20px ${T.gold}44`,
            transition:"transform 0.2s"
          }}>Browse by Topic →</button>
          <button onClick={() => navigate("/browse")} style={{
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
                onClick={() => navigate(`/browse?topic=${t.id}`)}
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
                onClick={() => navigate(`/browse?collection=${col.id}`)}
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
}
