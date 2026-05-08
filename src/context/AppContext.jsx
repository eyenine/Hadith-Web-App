import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [dataLoading, setDataLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [topics, setTopics] = useState([]);
  const [hadith, setHadith] = useState([]);

  const [bookmarks, setBookmarks] = useState([]);
  const [langMode, setLangMode] = useState("both"); // "both", "en", "bn"
  const [dark, setDark] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

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

  const value = {
    dataLoading, collections, topics, hadith,
    bookmarks, toggleBookmark,
    langMode, setLangMode,
    dark, setDark,
    searchQuery, setSearchQuery,
    searchActive, setSearchActive,
    T
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
