import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import GeometricBg from "./components/GeometricBg";

import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import BrowsePage from "./pages/BrowsePage";
import BookmarksPage from "./pages/BookmarksPage";

/* ── Google Fonts ── */
if (typeof document !== 'undefined' && !document.getElementById('google-fonts')) {
  const fontLink = document.createElement("link");
  fontLink.id = "google-fonts";
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Sans+Bengali:wght@400;500;600&display=swap";
  document.head.appendChild(fontLink);
}

function AppContent() {
  const { dataLoading, dark, hadith, topics, T } = useAppContext();

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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>

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
          HadithDB · Kutub al-Sittah · {hadith?.length || 0} hadith across {topics?.length || 0} topics
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
}

