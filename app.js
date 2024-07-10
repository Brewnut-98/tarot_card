const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Tarot card data with updated image URLs
const tarotCards = [
    { name: "Ace of Cups", image: "https://tarotai.one/images/ace-of-cups.png", meaning: "New feelings, emotional freshness, intuition, compassion" },
    { name: "Ace of Swords", image: "https://tarotai.one/images/ace-of-swords.png", meaning: "Mental clarity, new ideas, breakthrough, truth" },
    { name: "Ace of Wands", image: "https://tarotai.one/images/ace-of-wands.png", meaning: "New beginnings, inspiration, potential, opportunity" },
    { name: "Death", image: "https://tarotai.one/images/death.png", meaning: "Endings, change, transformation, transition" },
    { name: "Eight of Cups", image: "https://tarotai.one/images/eight-of-cups.png", meaning: "Walking away, disillusionment, leaving behind" },
    { name: "Eight of Swords", image: "https://tarotai.one/images/eight-of-swords.png", meaning: "Imprisonment, self-victimization, limiting beliefs" },
    { name: "Eight of Wands", image: "https://tarotai.one/images/eight-of-wands.png", meaning: "Swift action, movement, air travel, messages" },
    { name: "Five of Cups", image: "https://tarotai.one/images/five-of-cups.png", meaning: "Loss, regret, disappointment, pessimism" },
    { name: "Five of Swords", image: "https://tarotai.one/images/five-of-swords.png", meaning: "Conflict, disagreement, competition, defeat" },
    { name: "Five of Wands", image: "https://tarotai.one/images/five-of-wands.png", meaning: "Conflict, competition, rivalry, challenges" },
    { name: "Four of Cups", image: "https://tarotai.one/images/four-of-cups.png", meaning: "Apathy, contemplation, disconnectedness" },
    { name: "Four of Swords", image: "https://tarotai.one/images/four-of-swords.png", meaning: "Rest, relaxation, meditation, contemplation" },
    { name: "Four of Wands", image: "https://tarotai.one/images/four-of-wands.png", meaning: "Celebration, joy, harmony, homecoming" },
    { name: "Justice", image: "https://tarotai.one/images/justice.png", meaning: "Fairness, truth, cause and effect, law" },
    { name: "King of Cups", image: "https://tarotai.one/images/king-of-cups.png", meaning: "Emotional balance, compassion, diplomacy" },
    { name: "King of Swords", image: "https://tarotai.one/images/king-of-swords.png", meaning: "Intellectual power, authority, truth" },
    { name: "King of Wands", image: "https://tarotai.one/images/king-of-wands.png", meaning: "Inspirational leader, vision, entrepreneur" },
    { name: "Knight of Cups", image: "https://tarotai.one/images/knight-of-cups.png", meaning: "Romantic, imaginative, sensitive, messenger" },
    { name: "Knight of Swords", image: "https://tarotai.one/images/knight-of-swords.png", meaning: "Action, impulsiveness, defending beliefs" },
    { name: "Knight of Wands", image: "https://tarotai.one/images/knight-of-wands.png", meaning: "Energy, passion, adventure, impulsiveness" },
    { name: "Nine of Cups", image: "https://tarotai.one/images/nine-of-cups.png", meaning: "Contentment, satisfaction, gratitude" },
    { name: "Nine of Swords", image: "https://tarotai.one/images/nine-of-swords.png", meaning: "Anxiety, worry, fear, depression" },
    { name: "Nine of Wands", image: "https://tarotai.one/images/nine-of-wands.png", meaning: "Resilience, courage, persistence, test of faith" },
    { name: "Page of Cups", image: "https://tarotai.one/images/page-of-cups.png", meaning: "Creative opportunities, intuitive messages" },
    { name: "Page of Swords", image: "https://tarotai.one/images/page-of-swords.png", meaning: "New ideas, curiosity, thirst for knowledge" },
    { name: "Page of Wands", image: "https://tarotai.one/images/page-of-wands.png", meaning: "Exploration, excitement, freedom" },
    { name: "Queen of Cups", image: "https://tarotai.one/images/queen-of-cups.png", meaning: "Compassion, calm, comfort" },
    { name: "Queen of Swords", image: "https://tarotai.one/images/queen-of-swords.png", meaning: "Independent, unbiased judgment, clear boundaries" },
    { name: "Queen of Wands", image: "https://tarotai.one/images/queen-of-wands.png", meaning: "Courage, confidence, determination, joy" },
    { name: "Seven of Cups", image: "https://tarotai.one/images/seven-of-cups.png", meaning: "Opportunities, choices, wishful thinking" },
    { name: "Seven of Swords", image: "https://tarotai.one/images/seven-of-swords.png", meaning: "Deception, strategizing, resourcefulness" },
    { name: "Seven of Wands", image: "https://tarotai.one/images/seven-of-wands.png", meaning: "Challenge, competition, protection" },
    { name: "Six of Cups", image: "https://tarotai.one/images/six-of-cups.png", meaning: "Revisiting the past, childhood memories, innocence" },
    { name: "Six of Swords", image: "https://tarotai.one/images/six-of-swords.png", meaning: "Transition, change, rite of passage" },
    { name: "Six of Wands", image: "https://tarotai.one/images/six-of-wands.png", meaning: "Victory, success, public recognition" },
    { name: "Strength", image: "https://tarotai.one/images/strength.png", meaning: "Courage, patience, control, compassion" },
    { name: "Temperance", image: "https://tarotai.one/images/temperance.png", meaning: "Balance, moderation, patience, purpose" },
    { name: "Ten of Cups", image: "https://tarotai.one/images/ten-of-cups.png", meaning: "Divine love, blissful relationships, harmony" },
    { name: "Ten of Swords", image: "https://tarotai.one/images/ten-of-swords.png", meaning: "Painful endings, deep wounds, betrayal, loss" },
    { name: "Ten of Wands", image: "https://tarotai.one/images/ten-of-wands.png", meaning: "Burden, extra responsibility, hard work" },
    { name: "The Chariot", image: "https://tarotai.one/images/the-chariot.png", meaning: "Control, willpower, success, action, determination" },
    { name: "The Emperor", image: "https://tarotai.one/images/the-emperor.png", meaning: "Authority, establishment, structure, father figure" },
    { name: "The Empress", image: "https://tarotai.one/images/the-empress.png", meaning: "Femininity, beauty, nature, nurturing, abundance" },
    { name: "The Fool", image: "https://tarotai.one/images/the-fool.png", meaning: "New beginnings, spontaneity, innocence, adventure" },
    { name: "The Hanged Man", image: "https://tarotai.one/images/the-hanged-man.png", meaning: "Surrender, letting go, new perspective" },
    { name: "The Hermit", image: "https://tarotai.one/images/the-hermit.png", meaning: "Soul-searching, introspection, guidance, solitude" },
    { name: "The Hierophant", image: "https://tarotai.one/images/the-hierophant.png", meaning: "Spiritual wisdom, tradition, conformity, morality" },
    { name: "The High Priestess", image: "https://tarotai.one/images/the-high-priestess.png", meaning: "Intuition, sacred knowledge, divine feminine" },
    { name: "The Magician", image: "https://tarotai.one/images/the-magician.png", meaning: "Manifestation, resourcefulness, power, inspired action" },
    { name: "The Moon", image: "https://tarotai.one/images/the-moon.png", meaning: "Illusion, fear, anxiety, subconscious, intuition" },
    { name: "The Tower", image: "https://tarotai.one/images/the-tower.png", meaning: "Sudden upheaval, broken pride, disaster" },
    { name: "Three of Cups", image: "https://tarotai.one/images/three-of-cups.png", meaning: "Celebration, friendship, creativity, collaboration" },
    { name: "Three of Swords", image: "https://tarotai.one/images/three-of-swords.png", meaning: "Heartbreak, emotional pain, sorrow, grief" },
    { name: "Three of Wands", image: "https://tarotai.one/images/three-of-wands.png", meaning: "Foresight, expansion, preparation, long-term vision" },
    { name: "Two of Cups", image: "https://tarotai.one/images/two-of-cups.png", meaning: "Unity, partnership, attraction, connection" },
    { name: "Two of Swords", image: "https://tarotai.one/images/two-of-swords.png", meaning: "Stalemate, difficult decisions, blocked emotions" },
    { name: "Two of Wands", image: "https://tarotai.one/images/two-of-wands.png", meaning: "Future planning, progress, decisions, discovery" },
    { name: "Wheel of Fortune", image: "https://tarotai.one/images/wheel-of-fortune.png", meaning: "Good luck, karma, life cycles, destiny, change" }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tarotCards: JSON.stringify(tarotCards) });
});

// Start the server
app.listen(port, () => {
    console.log(`Tarot app listening at http://localhost:${port}`);
});
