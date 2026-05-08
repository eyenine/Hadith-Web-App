import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { VirtuosoGrid } from "react-virtuoso";
import { useAppContext } from "../context/AppContext";
import HadithCard from "../components/HadithCard";
import Modal from "../components/Modal";

export default function BrowsePage() {
  const { 
    hadith, collections, topics, 
    langMode, dark, 
    bookmarks, toggleBookmark, 
    searchQuery, setSearchQuery, 
    T 
  } = useAppContext();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTopic = searchParams.get("topic");
  const activeCol = searchParams.get("collection");

  const [displayLimit, setDisplayLimit] = useState(20);
  const [selectedHadith, setSelectedHadith] = useState(null);

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

  // Reset display limit when filters change
  useEffect(() => {
    setDisplayLimit(20);
  }, [activeTopic, activeCol, searchQuery]);

  const currentTopic = topics.find(t => t.id === activeTopic);
  const currentCol   = collections.find(c => c.id === activeCol);
  
  const displayedHadith = filteredHadith.slice(0, displayLimit);
  const hasMore = displayLimit < filteredHadith.length;

  const setActiveTopic = (id) => {
    const newParams = new URLSearchParams(searchParams);
    if (id) newParams.set("topic", id);
    else newParams.delete("topic");
    setSearchParams(newParams);
  };

  const setActiveCol = (id) => {
    const newParams = new URLSearchParams(searchParams);
    if (id) newParams.set("collection", id);
    else newParams.delete("collection");
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery("");
  };

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
          <button onClick={clearFilters} style={{
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
        <VirtuosoGrid
          useWindowScroll
          totalCount={filteredHadith.length}
          components={{
            List: React.forwardRef(({ style, children, ...props }, ref) => (
              <div
                ref={ref}
                {...props}
                style={{
                  ...style,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: 16
                }}
              >
                {children}
              </div>
            ))
          }}
          itemContent={(index) => {
            const h = filteredHadith[index];
            return (
              <HadithCard h={h} collections={collections} topics={topics} langMode={langMode} dark={dark}
                bookmarks={bookmarks} onBookmark={toggleBookmark}
                onOpen={setSelectedHadith} />
            );
          }}
        />
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
