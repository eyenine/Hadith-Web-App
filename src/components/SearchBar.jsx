import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function SearchBar() {
  const { searchActive, setSearchActive, searchQuery, setSearchQuery, dark, T } = useAppContext();
  const navigate = useNavigate();

  if (!searchActive) return null;

  return (
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
          onChange={e => { 
            setSearchQuery(e.target.value); 
            if (e.target.value) {
              navigate("/browse");
            }
          }}
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
  );
}
