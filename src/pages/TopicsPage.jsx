import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function TopicsPage() {
  const { topics, hadith, collections, dark, T } = useAppContext();
  const navigate = useNavigate();

  return (
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
              onClick={() => navigate(`/browse?topic=${t.id}`)}
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
}
