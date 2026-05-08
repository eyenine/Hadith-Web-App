const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('HadithApp.jsx', 'utf-8');

// Extract COLLECTIONS
const collectionsMatch = content.match(/const COLLECTIONS = (\[[\s\S]*?\]);/);
// Extract TOPICS
const topicsMatch = content.match(/const TOPICS = (\[[\s\S]*?\]);/);
// Extract HADITH
const hadithMatch = content.match(/const HADITH = (\[[\s\S]*?\]);/);

if (!fs.existsSync('public/data')) {
  fs.mkdirSync('public/data', { recursive: true });
}

if (collectionsMatch) {
  // Hack to evaluate object literals without keys in quotes
  const data = eval(collectionsMatch[1]);
  fs.writeFileSync('public/data/collections.json', JSON.stringify(data, null, 2));
}

if (topicsMatch) {
  const data = eval(topicsMatch[1]);
  fs.writeFileSync('public/data/topics.json', JSON.stringify(data, null, 2));
}

if (hadithMatch) {
  const data = eval(hadithMatch[1]);
  fs.writeFileSync('public/data/hadiths.json', JSON.stringify(data, null, 2));
}

console.log("Extraction complete!");
