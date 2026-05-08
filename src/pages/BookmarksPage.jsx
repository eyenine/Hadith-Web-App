import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import HadithCard from "../components/HadithCard";
import Modal from "../components/Modal";

export default function BookmarksPage() {
  const { hadith, collections, topics, langMode, dark, bookmarks, toggleBookmark, T } = useAppContext();
  const navigate = useNavigate();
  const [selectedHadith, setSelectedHadith] = useState(null);

  const bookmarkedHadith = useMemo(() => 
    hadith.filter(h => bookmarks.includes(h.id)),
  [hadith, bookmarks]);

  return (
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
          <button onClick={() => navigate("/browse")} style={{
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

      <Modal
        h={selectedHadith}
        collections={collections}
        topics={topics}
        dark={dark}
        bookmarks={bookmarks}
        onBookmark={toggleBookmark}
        onClose={() => setSelectedHadith(null)}
      />
    </div>
  );
}
