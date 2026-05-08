import { useState, useMemo, useEffect } from "react";

/* ── Google Fonts ── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Sans+Bengali:wght@400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const COLLECTIONS = [
  { id: "bukhari",  name: "Sahih al-Bukhari",   short: "Bukhari",   color: "#C9A84C", bg: "#2A1F08" },
  { id: "muslim",   name: "Sahih Muslim",        short: "Muslim",    color: "#4B9FC9", bg: "#081A2A" },
  { id: "abudawud", name: "Sunan Abu Dawud",     short: "Abu Dawud", color: "#4BC996", bg: "#082A1F" },
  { id: "tirmidhi", name: "Jami at-Tirmidhi",   short: "Tirmidhi",  color: "#C94B4B", bg: "#2A0808" },
  { id: "nasai",    name: "Sunan an-Nasa'i",     short: "Nasa'i",    color: "#9B4BC9", bg: "#1A082A" },
  { id: "ibnmajah", name: "Sunan Ibn Majah",     short: "Ibn Majah", color: "#C97B4B", bg: "#2A1208" },
];

const TOPICS = [
  { id: "faith",       name: "Faith",       namebn: "ঈমান",      icon: "☪" },
  { id: "prayer",      name: "Prayer",      namebn: "নামাজ",     icon: "🕌" },
  { id: "fasting",     name: "Fasting",     namebn: "রোজা",      icon: "🌙" },
  { id: "charity",     name: "Charity",     namebn: "দান",       icon: "✦" },
  { id: "knowledge",   name: "Knowledge",   namebn: "জ্ঞান",     icon: "📖" },
  { id: "manners",     name: "Manners",     namebn: "আদব",       icon: "🤝" },
  { id: "patience",    name: "Patience",    namebn: "ধৈর্য",     icon: "⌛" },
  { id: "honesty",     name: "Honesty",     namebn: "সততা",      icon: "🌿" },
  { id: "family",      name: "Family",      namebn: "পরিবার",    icon: "❤" },
  { id: "cleanliness", name: "Cleanliness", namebn: "পবিত্রতা",  icon: "💧" },
];

const HADITH = [
  /* ── FAITH ── */
  { id:1, topic:"faith", collection:"bukhari", number:"1",
    arabic:"إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    english:"Actions are judged by intentions, and every person will get the reward of what they intended.",
    bengali:"কাজসমূহ নিয়তের উপর নির্ভরশীল এবং প্রত্যেক ব্যক্তি তাই পাবে যা সে নিয়ত করেছে।",
    narrator:"Umar ibn al-Khattab (RA)", grade:"Sahih" },
  { id:2, topic:"faith", collection:"muslim", number:"8",
    arabic:"الإِيمَانُ أَنْ تُؤْمِنَ بِاللَّهِ وَمَلاَئِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الآخِرِ",
    english:"Faith is to believe in Allah, His angels, His books, His messengers, and the Last Day — and to believe in the divine decree, both good and bad.",
    bengali:"ঈমান হলো আল্লাহ, তাঁর ফেরেশতা, তাঁর কিতাবসমূহ, তাঁর রাসূলগণ ও শেষ দিবসের প্রতি বিশ্বাস রাখা এবং তাকদিরের ভালো-মন্দ উভয়ের প্রতি বিশ্বাস রাখা।",
    narrator:"Umar ibn al-Khattab (RA)", grade:"Sahih" },
  { id:3, topic:"faith", collection:"bukhari", number:"2",
    arabic:"بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ",
    english:"Islam is built upon five pillars: testifying there is no god but Allah and Muhammad is His messenger, establishing prayer, paying Zakat, performing Hajj, and fasting Ramadan.",
    bengali:"ইসলাম পাঁচটি স্তম্ভের উপর প্রতিষ্ঠিত: কালিমার সাক্ষ্য, নামাজ কায়েম করা, যাকাত দেওয়া, হজ্জ পালন করা এবং রমজানে রোজা রাখা।",
    narrator:"Ibn Umar (RA)", grade:"Sahih" },
  /* ── PRAYER ── */
  { id:4, topic:"prayer", collection:"tirmidhi", number:"413",
    arabic:"أَوَّلُ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ صَلاَتُهُ",
    english:"The first thing a person will be asked about on the Day of Judgment is the prayer. If it is good, all his deeds will be good; if it is bad, all his deeds will be bad.",
    bengali:"কিয়ামতের দিন বান্দার প্রথম যে আমল সম্পর্কে জিজ্ঞাসা করা হবে তা হলো নামাজ। যদি ভালো হয়, সমস্ত আমল ভালো; যদি নষ্ট হয়, সমস্ত আমল নষ্ট।",
    narrator:"Abu Hurairah (RA)", grade:"Hasan" },
  { id:5, topic:"prayer", collection:"muslim", number:"251",
    arabic:"الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ",
    english:"Purity is half of faith. Alhamdulillah fills the scale. SubhanAllah and Alhamdulillah fill what is between the heavens and the earth.",
    bengali:"পবিত্রতা ঈমানের অর্ধেক। আলহামদুলিল্লাহ পাল্লা ভরে দেয়। সুবহানাল্লাহ ও আলহামদুলিল্লাহ একসাথে আসমান ও জমিনের মধ্যবর্তী সমস্ত কিছু পূর্ণ করে।",
    narrator:"Abu Malik al-Ash'ari (RA)", grade:"Sahih" },
  { id:6, topic:"prayer", collection:"bukhari", number:"528",
    arabic:"الصَّلاَةُ عِمَادُ الدِّينِ، فَمَنْ أَقَامَهَا فَقَدْ أَقَامَ الدِّينَ",
    english:"Prayer is the pillar of religion. Whoever establishes it has established the religion, and whoever abandons it has demolished the religion.",
    bengali:"নামাজ দ্বীনের খুঁটি। যে এটি কায়েম করল সে দ্বীন কায়েম করল, আর যে এটি ছেড়ে দিল সে দ্বীন ধ্বংস করল।",
    narrator:"Muadh ibn Jabal (RA)", grade:"Sahih" },
  /* ── FASTING ── */
  { id:7, topic:"fasting", collection:"bukhari", number:"1904",
    arabic:"مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    english:"Whoever fasts in Ramadan with faith and seeking reward from Allah, his previous sins will be forgiven.",
    bengali:"যে ব্যক্তি ঈমানের সাথে ও সওয়াবের আশায় রমজান মাসে রোজা রাখে, তার পূর্ববর্তী সমস্ত গুনাহ মাফ করে দেওয়া হয়।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  { id:8, topic:"fasting", collection:"muslim", number:"1151",
    arabic:"الصِّيَامُ جُنَّةٌ، فَلاَ يَرْفُثْ وَلاَ يَجْهَلْ، وَإِنِ امْرُؤٌ قَاتَلَهُ فَلْيَقُلْ: إِنِّي صَائِمٌ",
    english:"Fasting is a shield. The fasting person should not engage in obscene or ignorant speech. If someone insults or fights him, he should say: 'I am fasting.'",
    bengali:"রোজা ঢালস্বরূপ। রোজাদার যেন অশ্লীল কথা না বলে। যদি কেউ ঝগড়া করতে আসে, সে বলুক: আমি রোজাদার।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  { id:9, topic:"fasting", collection:"tirmidhi", number:"764",
    arabic:"ثَلاَثَةٌ لاَ تُرَدُّ دَعْوَتُهُمُ: الصَّائِمُ حَتَّى يُفْطِرَ",
    english:"Three supplications are not rejected: the supplication of the fasting person until he breaks his fast, the just ruler, and the one who is oppressed.",
    bengali:"তিন ব্যক্তির দোয়া ফিরিয়ে দেওয়া হয় না: ইফতার পর্যন্ত রোজাদারের দোয়া, ন্যায়পরায়ণ শাসকের দোয়া এবং মজলুমের দোয়া।",
    narrator:"Abu Hurairah (RA)", grade:"Hasan" },
  /* ── CHARITY ── */
  { id:10, topic:"charity", collection:"bukhari", number:"1410",
    arabic:"مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
    english:"Charity does not decrease wealth. No one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.",
    bengali:"দান-সদকা সম্পদ কমায় না। যে ব্যক্তি ক্ষমা করে, আল্লাহ তার সম্মান বৃদ্ধি করেন এবং যে আল্লাহর জন্য বিনম্র হয়, আল্লাহ তার মর্যাদা উন্নীত করেন।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  { id:11, topic:"charity", collection:"muslim", number:"1631",
    arabic:"إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ",
    english:"When a person dies, all his deeds come to an end except for three: ongoing charity (Sadaqah Jariyah), knowledge that benefits others, and a righteous child who prays for him.",
    bengali:"মানুষ মৃত্যুবরণ করলে তার আমল বন্ধ হয়, তিনটি ছাড়া: প্রবাহমান সদকা, উপকারী জ্ঞান এবং নেক সন্তান যে তার জন্য দোয়া করে।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  { id:12, topic:"charity", collection:"ibnmajah", number:"1844",
    arabic:"اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ",
    english:"Protect yourself from the Fire even if it is by giving half a date in charity.",
    bengali:"জাহান্নাম থেকে নিজেকে বাঁচাও, তা যদি একটি খেজুরের অর্ধেক দিয়েও হয়।",
    narrator:"Adi ibn Hatim (RA)", grade:"Sahih" },
  /* ── KNOWLEDGE ── */
  { id:13, topic:"knowledge", collection:"ibnmajah", number:"224",
    arabic:"طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    english:"Seeking knowledge is an obligation upon every Muslim.",
    bengali:"জ্ঞান অর্জন করা প্রতিটি মুসলমানের উপর ফরজ।",
    narrator:"Anas ibn Malik (RA)", grade:"Sahih" },
  { id:14, topic:"knowledge", collection:"tirmidhi", number:"2682",
    arabic:"مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
    english:"Whoever takes a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.",
    bengali:"যে ব্যক্তি জ্ঞান অর্জনের জন্য কোনো পথে চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  { id:15, topic:"knowledge", collection:"abudawud", number:"3641",
    arabic:"الْعُلَمَاءُ وَرَثَةُ الأَنْبِيَاءِ",
    english:"The scholars are the heirs of the Prophets. The Prophets did not leave behind gold or silver — they left behind knowledge.",
    bengali:"আলেমরা নবীদের উত্তরাধিকারী। নবীরা দিনার বা দিরহাম রেখে যাননি, বরং তারা জ্ঞান রেখে গেছেন।",
    narrator:"Abu Darda (RA)", grade:"Sahih" },
  /* ── MANNERS ── */
  { id:16, topic:"manners", collection:"bukhari", number:"6018",
    arabic:"الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    english:"A Muslim is one from whose tongue and hand other Muslims are safe.",
    bengali:"মুসলমান সে, যার জিহ্বা ও হাত থেকে অন্য মুসলমানরা নিরাপদ।",
    narrator:"Abdullah ibn Amr (RA)", grade:"Sahih" },
  { id:17, topic:"manners", collection:"tirmidhi", number:"1977",
    arabic:"أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
    english:"The most complete of the believers in faith are those with the best character.",
    bengali:"মুমিনদের মধ্যে ঈমানে সবচেয়ে পরিপূর্ণ হলো সে, যার চরিত্র সবচেয়ে উত্তম।",
    narrator:"Abu Hurairah (RA)", grade:"Hasan Sahih" },
  { id:18, topic:"manners", collection:"muslim", number:"2564",
    arabic:"لاَ تَحَاسَدُوا وَلاَ تَنَاجَشُوا وَلاَ تَبَاغَضُوا وَلاَ تَدَابَرُوا وَكُونُوا إِخْوَانًا",
    english:"Do not envy one another, do not artificially inflate prices, do not hate one another, and do not turn away from one another. Be brothers, O servants of Allah.",
    bengali:"তোমরা পরস্পর হিংসা করো না, কৃত্রিমভাবে দাম বাড়িও না, পরস্পর বিদ্বেষ পোষণ করো না এবং পরস্পর থেকে মুখ ফিরিয়ে নিও না। হে আল্লাহর বান্দারা, তোমরা ভাই ভাই হয়ে থাকো।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  /* ── PATIENCE ── */
  { id:19, topic:"patience", collection:"muslim", number:"2999",
    arabic:"عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ",
    english:"How wonderful is the affair of the believer! All his affairs are good. If something good happens, he is thankful — that is good for him. If something bad happens, he is patient — that is also good for him.",
    bengali:"মুমিনের বিষয় কতই না আশ্চর্যজনক! তার সকল বিষয়ই কল্যাণকর। ভালো কিছু হলে কৃতজ্ঞতা প্রকাশ করে — এটি কল্যাণকর। কষ্ট হলে ধৈর্য ধরে — এটিও কল্যাণকর।",
    narrator:"Suhaib ibn Sinan (RA)", grade:"Sahih" },
  { id:20, topic:"patience", collection:"bukhari", number:"5641",
    arabic:"مَا يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلاَ وَصَبٍ وَلاَ هَمٍّ وَلاَ حَزَنٍ",
    english:"No fatigue, nor disease, nor anxiety, nor sadness, nor harm, nor distress befalls a Muslim — even the prick of a thorn — but that Allah expiates some of his sins for that.",
    bengali:"কোনো মুসলমানের উপর যে কোনো ক্লান্তি, রোগ, উদ্বেগ, দুঃখ, কষ্ট বা পেরেশানি আসে — এমনকি একটি কাঁটার আঘাতও — আল্লাহ এর বিনিময়ে তার গুনাহ মাফ করে দেন।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  { id:21, topic:"patience", collection:"nasai", number:"1302",
    arabic:"الصَّبْرُ ضِيَاءٌ وَالصَّلاَةُ نُورٌ",
    english:"Patience is a light, and prayer is light (for the believer). Charity is a proof. The Quran is an argument for or against you.",
    bengali:"ধৈর্য আলো এবং নামাজ নূর। সদকা প্রমাণ। কুরআন তোমার পক্ষে বা বিপক্ষে দলিল।",
    narrator:"Abu Malik al-Ash'ari (RA)", grade:"Sahih" },
  /* ── HONESTY ── */
  { id:22, topic:"honesty", collection:"bukhari", number:"6094",
    arabic:"عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ",
    english:"You must be truthful. Truthfulness leads to righteousness and righteousness leads to Paradise. A man keeps telling the truth until he is recorded with Allah as a truthful person (Siddiq).",
    bengali:"তোমরা সত্যবাদিতা অবলম্বন করো। কারণ সত্যবাদিতা নেক কাজের দিকে এবং নেক কাজ জান্নাতের দিকে নিয়ে যায়। মানুষ সত্য বলতে থাকে, এমনকি আল্লাহর কাছে সিদ্দিক হিসেবে লেখা হয়।",
    narrator:"Ibn Masud (RA)", grade:"Sahih" },
  { id:23, topic:"honesty", collection:"abudawud", number:"4989",
    arabic:"آيَةُ الْمُنَافِقِ ثَلاَثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ",
    english:"The signs of a hypocrite are three: when he speaks, he lies; when he makes a promise, he breaks it; and when he is entrusted with something, he betrays the trust.",
    bengali:"মুনাফিকের আলামত তিনটি: যখন কথা বলে মিথ্যা বলে, ওয়াদা করলে ভঙ্গ করে এবং আমানত রাখা হলে খিয়ানত করে।",
    narrator:"Abu Hurairah (RA)", grade:"Sahih" },
  /* ── FAMILY ── */
  { id:24, topic:"family", collection:"bukhari", number:"5971",
    arabic:"خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ وَأَنَا خَيْرُكُمْ لأَهْلِي",
    english:"The best of you are those who are best to their families, and I am the best of you to my family.",
    bengali:"তোমাদের মধ্যে সর্বোত্তম সে যে তার পরিবারের প্রতি সর্বোত্তম, আর আমি আমার পরিবারের প্রতি তোমাদের মধ্যে সর্বোত্তম।",
    narrator:"Aisha (RA)", grade:"Sahih" },
  { id:25, topic:"family", collection:"muslim", number:"2548",
    arabic:"الرَّحِمُ مُعَلَّقَةٌ بِالْعَرْشِ تَقُولُ مَنْ وَصَلَنِي وَصَلَهُ اللَّهُ",
    english:"The womb (family ties) is attached to the Throne and says: 'Whoever maintains ties with me, Allah will maintain ties with him; whoever cuts me off, Allah will cut him off.'",
    bengali:"রেহেম (আত্মীয়তার বন্ধন) আরশের সাথে ঝুলানো এবং বলে: যে আমাকে জুড়ে রাখবে, আল্লাহ তাকে জুড়ে রাখবেন এবং যে আমাকে ছিন্ন করবে, আল্লাহ তাকে ছিন্ন করবেন।",
    narrator:"Aisha (RA)", grade:"Sahih" },
  { id:26, topic:"family", collection:"nasai", number:"3104",
    arabic:"الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ",
    english:"Paradise lies beneath the feet of mothers.",
    bengali:"জান্নাত মায়েদের পায়ের নিচে।",
    narrator:"Anas ibn Malik (RA)", grade:"Hasan" },
  /* ── CLEANLINESS ── */
  { id:27, topic:"cleanliness", collection:"muslim", number:"223",
    arabic:"النَّظَافَةُ مِنَ الإِيمَانِ",
    english:"Cleanliness is part of faith.",
    bengali:"পরিচ্ছন্নতা ঈমানের অংশ।",
    narrator:"Abu Malik al-Ash'ari (RA)", grade:"Sahih" },
  { id:28, topic:"cleanliness", collection:"tirmidhi", number:"2799",
    arabic:"إِنَّ اللَّهَ طَيِّبٌ يُحِبُّ الطَّيِّبَ نَظِيفٌ يُحِبُّ النَّظَافَةَ كَرِيمٌ يُحِبُّ الْكَرَمَ",
    english:"Indeed Allah is pure and loves purity. He is clean and loves cleanliness. He is generous and loves generosity. He is hospitable and loves hospitality.",
    bengali:"নিশ্চয়ই আল্লাহ পবিত্র এবং পবিত্রতা পছন্দ করেন। তিনি পরিষ্কার এবং পরিষ্কার-পরিচ্ছন্নতা পছন্দ করেন। তিনি দাতা এবং দানশীলতা পছন্দ করেন।",
    narrator:"Saad ibn Abi Waqqas (RA)", grade:"Hasan" },
  { id:29, topic:"cleanliness", collection:"ibnmajah", number:"349",
    arabic:"عَشْرٌ مِنَ الْفِطْرَةِ: قَصُّ الشَّارِبِ وَإِعْفَاءُ اللِّحْيَةِ وَالسِّوَاكُ",
    english:"Ten practices are from natural disposition (fitrah): trimming the mustache, letting the beard grow, using the miswak (toothstick), sniffing water in the nose, cutting nails, washing between fingers, and more.",
    bengali:"দশটি বিষয় ফিতরাতের অন্তর্ভুক্ত: গোঁফ ছাঁটা, দাড়ি লম্বা করা, মিসওয়াক করা, নাকে পানি দেওয়া, নখ কাটা, আঙুলের মাঝখানে ধোয়া ইত্যাদি।",
    narrator:"Aisha (RA)", grade:"Sahih" },
];

/* ══════════════════════════════════════════════
   GEOMETRIC PATTERN (SVG background)
══════════════════════════════════════════════ */
const GeometricBg = ({ opacity = 0.04 }) => (
  <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="geo" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon points="40,4 76,22 76,58 40,76 4,58 4,22"
          fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity={opacity * 10} />
        <line x1="40" y1="4"  x2="40" y2="76" stroke="#C9A84C" strokeWidth="0.3" opacity={opacity * 8} />
        <line x1="4"  y1="40" x2="76" y2="40" stroke="#C9A84C" strokeWidth="0.3" opacity={opacity * 8} />
        <circle cx="40" cy="40" r="8" fill="none" stroke="#C9A84C" strokeWidth="0.4" opacity={opacity * 12} />
        <circle cx="40" cy="40" r="2" fill="#C9A84C" opacity={opacity * 15} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#geo)" />
  </svg>
);

/* ══════════════════════════════════════════════
   GRADE BADGE
══════════════════════════════════════════════ */
const GradeBadge = ({ grade }) => {
  const col = grade === "Sahih" ? "#4BC996"
    : grade === "Hasan Sahih" ? "#4B9FC9"
    : "#C9A84C";
  return (
    <span style={{
      fontSize:10, fontWeight:600, letterSpacing:"0.08em",
      background: col + "22", color: col,
      border: `1px solid ${col}44`,
      borderRadius:4, padding:"2px 8px",
      fontFamily:"'Lora', serif", textTransform:"uppercase"
    }}>{grade}</span>
  );
};

/* ══════════════════════════════════════════════
   HADITH CARD
══════════════════════════════════════════════ */
const HadithCard = ({ h, langMode, dark, bookmarks, onBookmark, onOpen }) => {
  const col = COLLECTIONS.find(c => c.id === h.collection);
  const topic = TOPICS.find(t => t.id === h.topic);
  const isBookmarked = bookmarks.includes(h.id);
  const [hovered, setHovered] = useState(false);

  const bg   = dark ? (hovered ? "#1E3D32" : "#172E25") : (hovered ? "#FFFDF5" : "#FFFFFF");
  const bord = dark ? (hovered ? "#3A6A54" : "#243D31") : (hovered ? "#C9A84C" : "#E8DFC0");

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: bg, border: `1px solid ${bord}`,
        borderRadius:16, padding:"24px",
        cursor:"pointer", transition:"all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered
          ? (dark ? "0 12px 40px #00000060, 0 0 0 1px #C9A84C33" : "0 12px 40px #0000001A, 0 0 0 1px #C9A84C44")
          : (dark ? "0 2px 12px #00000040" : "0 2px 12px #0000000E"),
        position:"relative", overflow:"hidden",
      }}>
      {/* Accent bar */}
      <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%",
        background: col?.color, borderRadius:"3px 0 0 3px" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <span style={{
            fontSize:11, fontWeight:600, color: col?.color,
            background: col?.color + "18",
            border: `1px solid ${col?.color}33`,
            borderRadius:20, padding:"3px 10px", letterSpacing:"0.06em"
          }}>{col?.short}</span>
          <span style={{
            fontSize:11, color: dark ? "#7A9E8A" : "#7A8A6A",
            background: dark ? "#1F3A2C" : "#F0EBD8",
            borderRadius:20, padding:"3px 10px"
          }}>#{h.number}</span>
          <GradeBadge grade={h.grade} />
        </div>
        <button onClick={(e) => { e.stopPropagation(); onBookmark(h.id); }}
          style={{
            background:"none", border:"none", cursor:"pointer",
            fontSize:20, lineHeight:1, padding:4,
            color: isBookmarked ? "#C9A84C" : (dark ? "#3A5A48" : "#C0B890"),
            transition:"all 0.2s",
            transform: isBookmarked ? "scale(1.2)" : "scale(1)",
          }}>
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>

      {/* Arabic */}
      <div onClick={() => onOpen(h)}
        style={{
          fontFamily:"'Amiri', serif", fontSize:20, lineHeight:1.9,
          textAlign:"right", direction:"rtl",
          color: dark ? "#E8D8A8" : "#5A3A0A",
          marginBottom:16, padding:"12px 0",
          borderBottom: `1px solid ${dark ? "#2A4538" : "#E8DFC0"}`,
        }}>{h.arabic}</div>

      {/* Translations */}
      <div onClick={() => onOpen(h)} style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {(langMode === "en" || langMode === "both") && (
          <p style={{
            fontFamily:"'Lora', serif", fontSize:14, lineHeight:1.75,
            color: dark ? "#C8D8C0" : "#2A3A2A", margin:0
          }}>
            <span style={{ color:"#C9A84C", fontWeight:600, fontSize:11, marginRight:6 }}>EN</span>
            {h.english}
          </p>
        )}
        {(langMode === "bn" || langMode === "both") && (
          <p style={{
            fontFamily:"'Noto Sans Bengali', sans-serif", fontSize:14, lineHeight:1.85,
            color: dark ? "#B8C8B4" : "#3A4A3A", margin:0
          }}>
            <span style={{ color:"#C9A84C", fontWeight:600, fontSize:11, marginRight:6 }}>BN</span>
            {h.bengali}
          </p>
        )}
      </div>

      {/* Footer */}
      <div style={{
        marginTop:14, paddingTop:12,
        borderTop: `1px solid ${dark ? "#2A4538" : "#E8DFC0"}`,
        display:"flex", justifyContent:"space-between", alignItems:"center"
      }}>
        <span style={{ fontSize:12, color: dark ? "#5A8A6A" : "#8A9A7A", fontStyle:"italic" }}>
          — {h.narrator}
        </span>
        <span style={{ fontSize:11, color: dark ? "#3A6A4A" : "#A0B090" }}>
          {topic?.icon} {topic?.name}
        </span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */
const Modal = ({ h, dark, bookmarks, onBookmark, onClose }) => {
  if (!h) return null;
  const col = COLLECTIONS.find(c => c.id === h.collection);
  const topic = TOPICS.find(t => t.id === h.topic);
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

        {/* Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:16, right:16,
          background: dark ? "#1A3228" : "#F0EBD8",
          border:`1px solid ${bord}`, borderRadius:8,
          width:32, height:32, cursor:"pointer",
          color: dark ? "#7A9E8A" : "#6A7A6A",
          fontSize:16, display:"flex", alignItems:"center", justifyContent:"center"
        }}>✕</button>

        {/* Collection badge */}
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

        {/* Arabic big */}
        <div style={{
          fontFamily:"'Amiri', serif", fontSize:26, lineHeight:2.1,
          textAlign:"right", direction:"rtl",
          color: dark ? "#E8D8A8" : "#4A2A08",
          background: dark ? "#132A1E" : "#FBF5E0",
          borderRadius:12, padding:"20px 24px",
          border:`1px solid ${dark ? "#2A4838" : "#E0D4A0"}`,
          marginBottom:20
        }}>{h.arabic}</div>

        {/* English */}
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

        {/* Bengali */}
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

        {/* Meta */}
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

        {/* Bookmark btn */}
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
};

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [page,            setPage]            = useState("home");
  const [activeTopic,     setActiveTopic]     = useState(null);
  const [activeCol,       setActiveCol]       = useState(null);
  const [selectedHadith,  setSelectedHadith]  = useState(null);
  const [bookmarks,       setBookmarks]       = useState([]);
  const [langMode,        setLangMode]        = useState("both");
  const [dark,            setDark]            = useState(true);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [searchActive,    setSearchActive]    = useState(false);

  const toggleBookmark = id =>
    setBookmarks(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id]);

  const filteredHadith = useMemo(() => {
    let list = HADITH;
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
  }, [activeTopic, activeCol, searchQuery]);

  const bookmarkedHadith = HADITH.filter(h => bookmarks.includes(h.id));

  /* ── theme tokens ── */
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

  /* ── nav helper ── */
  const goPage = p => { setPage(p); setActiveTopic(null); setActiveCol(null); setSearchQuery(""); };

  /* ── nav bar ── */
  const Navbar = () => (
    <nav style={{
      position:"sticky", top:0, zIndex:100,
      background: T.nav + "F0",
      backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${T.border}`,
      padding:"0 24px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      height:64,
    }}>
      {/* Logo */}
      <div onClick={() => goPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{
          width:36, height:36, borderRadius:"50%",
          background:`radial-gradient(circle, ${T.gold}44, ${T.gold}11)`,
          border:`1.5px solid ${T.gold}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, color:T.gold
        }}>☪</div>
        <div>
          <div style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:18, fontWeight:700, color:T.gold, lineHeight:1
          }}>HadithDB</div>
          <div style={{ fontSize:10, color:T.muted, letterSpacing:"0.1em" }}>KUTUB AL-SITTAH</div>
        </div>
      </div>

      {/* Center nav */}
      <div style={{ display:"flex", gap:4 }}>
        {[
          { id:"home",      label:"Home" },
          { id:"topics",    label:"Topics" },
          { id:"browse",    label:"Browse" },
          { id:"bookmarks", label:`Saved (${bookmarks.length})` },
        ].map(n => (
          <button key={n.id} onClick={() => goPage(n.id)} style={{
            background: page === n.id ? T.gold + "22" : "none",
            border: page === n.id ? `1px solid ${T.gold}44` : "1px solid transparent",
            borderRadius:8, padding:"6px 14px", cursor:"pointer",
            fontSize:13, color: page === n.id ? T.gold : T.muted,
            fontFamily:"'Lora', serif", transition:"all 0.2s",
            fontWeight: page === n.id ? 600 : 400
          }}>{n.label}</button>
        ))}
      </div>

      {/* Right controls */}
      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
        {/* Search toggle */}
        <button onClick={() => setSearchActive(s => !s)} style={{
          background: searchActive ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
          border:`1px solid ${searchActive ? T.gold : T.border}`,
          borderRadius:8, width:36, height:36, cursor:"pointer",
          color: searchActive ? T.gold : T.muted, fontSize:14,
          display:"flex", alignItems:"center", justifyContent:"center"
        }}>🔍</button>
        {/* Lang */}
        {["both","en","bn"].map(l => (
          <button key={l} onClick={() => setLangMode(l)} style={{
            background: langMode === l ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
            border:`1px solid ${langMode === l ? T.gold : T.border}`,
            borderRadius:6, padding:"4px 10px", cursor:"pointer",
            fontSize:11, fontWeight:600, letterSpacing:"0.06em",
            color: langMode === l ? T.gold : T.muted,
            transition:"all 0.2s"
          }}>{l.toUpperCase()}</button>
        ))}
        {/* Dark toggle */}
        <button onClick={() => setDark(d => !d)} style={{
          background: dark ? "#1A3228" : "#EEE8D0",
          border:`1px solid ${T.border}`, borderRadius:8,
          width:36, height:36, cursor:"pointer",
          fontSize:16, color:T.muted,
          display:"flex", alignItems:"center", justifyContent:"center"
        }}>{dark ? "☀" : "🌙"}</button>
      </div>
    </nav>
  );

  /* ── search bar ── */
  const SearchBar = () => searchActive ? (
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
          onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setPage("browse"); }}
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
  ) : null;

  /* ══════════════════
     HOME PAGE
  ══════════════════ */
  const HomePage = () => (
    <div>
      {/* Hero */}
      <div style={{
        background: dark
          ? "linear-gradient(160deg, #091A12 0%, #0F2A1E 50%, #0A1E16 100%)"
          : "linear-gradient(160deg, #F5F0E8 0%, #EDE5CE 50%, #F0EBD8 100%)",
        padding:"80px 24px 60px",
        textAlign:"center", position:"relative", overflow:"hidden"
      }}>
        <GeometricBg opacity={0.035} />

        {/* Crescent decoration */}
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

        {/* Stats row */}
        <div style={{ display:"flex", justifyContent:"center", gap:40, flexWrap:"wrap" }}>
          {[
            { n:HADITH.length, label:"Hadith" },
            { n:6, label:"Collections" },
            { n:TOPICS.length, label:"Topics" },
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

        {/* CTA buttons */}
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:32, flexWrap:"wrap" }}>
          <button onClick={() => goPage("topics")} style={{
            background:`linear-gradient(135deg, ${T.gold}, #A88030)`,
            border:"none", borderRadius:10, padding:"12px 28px",
            color:"#1A1000", fontSize:14, fontWeight:700,
            fontFamily:"'Lora', serif", cursor:"pointer",
            boxShadow:`0 4px 20px ${T.gold}44`,
            transition:"transform 0.2s"
          }}>Browse by Topic →</button>
          <button onClick={() => goPage("browse")} style={{
            background: dark ? "#1A3228" : "#EEE8D0",
            border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 28px",
            color:T.text, fontSize:14, fontFamily:"'Lora', serif", cursor:"pointer",
            transition:"transform 0.2s"
          }}>All Hadith</button>
        </div>
      </div>

      {/* Topics grid */}
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
          {TOPICS.map(t => {
            const count = HADITH.filter(h => h.topic === t.id).length;
            return (
              <div key={t.id}
                onClick={() => { setActiveTopic(t.id); setPage("browse"); }}
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

      {/* Collections */}
      <div style={{
        padding:"0 24px 48px",
        maxWidth:1100, margin:"0 auto"
      }}>
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
          {COLLECTIONS.map((col, i) => {
            const count = HADITH.filter(h => h.collection === col.id).length;
            return (
              <div key={col.id}
                onClick={() => { setActiveCol(col.id); setPage("browse"); }}
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

  /* ══════════════════
     TOPICS PAGE
  ══════════════════ */
  const TopicsPage = () => (
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
        {TOPICS.map(t => {
          const count = HADITH.filter(h => h.topic === t.id).length;
          const cols = [...new Set(HADITH.filter(h => h.topic === t.id).map(h => h.collection))];
          return (
            <div key={t.id}
              onClick={() => { setActiveTopic(t.id); setPage("browse"); }}
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
                  const col = COLLECTIONS.find(x => x.id === c);
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

  /* ══════════════════
     BROWSE PAGE
  ══════════════════ */
  const BrowsePage = () => {
    const currentTopic = TOPICS.find(t => t.id === activeTopic);
    const currentCol   = COLLECTIONS.find(c => c.id === activeCol);

    return (
      <div style={{ padding:"32px 24px", maxWidth:1100, margin:"0 auto" }}>
        {/* Filters row */}
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
          {/* Clear filters */}
          {(activeTopic || activeCol || searchQuery) && (
            <button onClick={() => { setActiveTopic(null); setActiveCol(null); setSearchQuery(""); }} style={{
              background:"none", border:`1px solid ${T.border}`,
              borderRadius:8, padding:"6px 12px", cursor:"pointer",
              fontSize:12, color:T.muted, fontFamily:"'Lora', serif"
            }}>✕ Clear filters</button>
          )}
          <div style={{ fontSize:13, color:T.muted }}>
            {filteredHadith.length} hadith
          </div>
        </div>

        {/* Topic filter chips */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
          <button onClick={() => setActiveTopic(null)} style={{
            background: !activeTopic ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
            border:`1px solid ${!activeTopic ? T.gold+"44" : T.border}`,
            borderRadius:20, padding:"5px 14px", cursor:"pointer",
            fontSize:12, color: !activeTopic ? T.gold : T.muted,
            fontFamily:"'Lora', serif"
          }}>All Topics</button>
          {TOPICS.map(t => (
            <button key={t.id} onClick={() => setActiveTopic(t.id === activeTopic ? null : t.id)} style={{
              background: activeTopic === t.id ? T.gold + "22" : (dark ? "#1A3228" : "#EEE8D0"),
              border:`1px solid ${activeTopic === t.id ? T.gold + "44" : T.border}`,
              borderRadius:20, padding:"5px 14px", cursor:"pointer",
              fontSize:12, color: activeTopic === t.id ? T.gold : T.muted,
              fontFamily:"'Lora', serif"
            }}>{t.icon} {t.name}</button>
          ))}
        </div>

        {/* Collection filter chips */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:28 }}>
          <button onClick={() => setActiveCol(null)} style={{
            background: !activeCol ? "#4BCCA822" : (dark ? "#1A3228" : "#EEE8D0"),
            border:`1px solid ${!activeCol ? "#4BCCA844" : T.border}`,
            borderRadius:20, padding:"5px 14px", cursor:"pointer",
            fontSize:12, color: !activeCol ? "#4BCCA8" : T.muted,
            fontFamily:"'Lora', serif"
          }}>All Collections</button>
          {COLLECTIONS.map(col => (
            <button key={col.id} onClick={() => setActiveCol(col.id === activeCol ? null : col.id)} style={{
              background: activeCol === col.id ? col.color + "22" : (dark ? "#1A3228" : "#EEE8D0"),
              border:`1px solid ${activeCol === col.id ? col.color + "44" : T.border}`,
              borderRadius:20, padding:"5px 14px", cursor:"pointer",
              fontSize:12, color: activeCol === col.id ? col.color : T.muted,
              fontFamily:"'Lora', serif"
            }}>{col.short}</button>
          ))}
        </div>

        {/* Hadith grid */}
        {filteredHadith.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:T.muted }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, marginBottom:8 }}>No hadith found</div>
            <div style={{ fontSize:14 }}>Try different filters or search terms.</div>
          </div>
        ) : (
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",
            gap:16
          }}>
            {filteredHadith.map(h => (
              <HadithCard key={h.id} h={h} langMode={langMode} dark={dark}
                bookmarks={bookmarks} onBookmark={toggleBookmark}
                onOpen={setSelectedHadith} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ══════════════════
     BOOKMARKS PAGE
  ══════════════════ */
  const BookmarksPage = () => (
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
          <button onClick={() => goPage("browse")} style={{
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
            <HadithCard key={h.id} h={h} langMode={langMode} dark={dark}
              bookmarks={bookmarks} onBookmark={toggleBookmark}
              onOpen={setSelectedHadith} />
          ))}
        </div>
      )}
    </div>
  );

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
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

      {page === "home"      && <HomePage />}
      {page === "topics"    && <TopicsPage />}
      {page === "browse"    && <BrowsePage />}
      {page === "bookmarks" && <BookmarksPage />}

      <Modal
        h={selectedHadith}
        dark={dark}
        bookmarks={bookmarks}
        onBookmark={toggleBookmark}
        onClose={() => setSelectedHadith(null)}
      />

      {/* Footer */}
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
          HadithDB · Kutub al-Sittah · {HADITH.length} hadith across {TOPICS.length} topics
        </div>
      </footer>
    </div>
  );
}
