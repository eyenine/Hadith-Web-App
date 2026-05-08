const fs = require('fs');

const collections = [
  { id: "bukhari",  name: "Sahih al-Bukhari",   short: "Bukhari",   color: "#C9A84C", bg: "#2A1F08" },
  { id: "muslim",   name: "Sahih Muslim",        short: "Muslim",    color: "#4B9FC9", bg: "#081A2A" },
  { id: "abudawud", name: "Sunan Abu Dawud",     short: "Abu Dawud", color: "#4BC996", bg: "#082A1F" },
  { id: "tirmidhi", name: "Jami at-Tirmidhi",   short: "Tirmidhi",  color: "#C94B4B", bg: "#2A0808" },
  { id: "nasai",    name: "Sunan an-Nasa'i",     short: "Nasa'i",    color: "#9B4BC9", bg: "#1A082A" },
  { id: "ibnmajah", name: "Sunan Ibn Majah",     short: "Ibn Majah", color: "#C97B4B", bg: "#2A1208" }
];

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function run() {
  let allHadiths = [];
  let allTopics = [];
  let idCounter = 1;

  for (const col of collections) {
    const book = col.id;
    console.log(`Downloading ${book}...`);
    try {
      const ara = await fetchJSON(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${book}.min.json`);
      const eng = await fetchJSON(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${book}.min.json`);
      
      let ben = { hadiths: [], metadata: { sections: {} } };
      try {
        ben = await fetchJSON(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-${book}.min.json`);
      } catch (e) {
        console.log(`No Bengali version for ${book}`);
      }

      // Extract sections (categories)
      const sections = eng.metadata.sections || {};
      const benSections = ben.metadata?.sections || {};

      for (const [key, value] of Object.entries(sections)) {
        if (!value || value.trim() === "") continue;
        
        // Add book short name to differentiate topics like "Faith (Bukhari)"
        const nameWithCol = `${value} (${col.short})`;
        const namebnWithCol = benSections[key] ? `${benSections[key]} (${col.short})` : nameWithCol;

        allTopics.push({
          id: `topic_${book}_${key}`,
          name: value,
          namebn: benSections[key] || value,
          icon: "📖",
          bookFilter: book // A custom property to help us group them if needed later
        });
      }

      const numHadiths = ara.hadiths.length;
      console.log(`Processing ${numHadiths} hadiths for ${book}`);
      
      // We will pull 1000 hadiths per book again to keep the file size reasonable
      const limit = Math.min(numHadiths, 1000);
      
      for (let i = 0; i < limit; i++) {
        const hAra = ara.hadiths[i];
        const hEng = eng.hadiths[i] || {};
        const hBen = ben.hadiths[i] || {};
        
        let bookRef = hEng.reference?.book || hAra.reference?.book || 0;
        let topicId = `topic_${book}_${bookRef}`;
        
        allHadiths.push({
          id: idCounter++,
          topic: topicId,
          collection: book,
          number: hAra.hadithnumber || i+1,
          arabic: hAra.text || "",
          english: hEng.text || "",
          bengali: hBen.text || "",
          narrator: "",
          grade: (hAra.grades && hAra.grades[0]) ? hAra.grades[0].grade : "Sahih"
        });
      }
    } catch(err) {
      console.error(`Failed on ${book}: ${err.message}`);
    }
  }

  // Fallback to removing any topics that don't have hadiths in our 6000 sample
  const topicsWithData = new Set(allHadiths.map(h => h.topic));
  allTopics = allTopics.filter(t => topicsWithData.has(t.id));

  fs.writeFileSync('public/data/collections.json', JSON.stringify(collections, null, 2));
  fs.writeFileSync('public/data/topics.json', JSON.stringify(allTopics, null, 2));
  fs.writeFileSync('public/data/hadiths.json', JSON.stringify(allHadiths));
  
  console.log(`Saved ${allHadiths.length} hadiths to hadiths.json`);
  console.log(`Saved ${allTopics.length} topics to topics.json`);
}

run();
