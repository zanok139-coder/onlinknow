// Book-specific search terms (Group F) added to each book page's meta keywords.
export const BOOK_KEYWORDS = {
  "as-a-man-thinketh": [
    "as a man thinketh free pdf",
    "james allen as a man thinketh summary",
    "mindset is everything book",
    "law of attraction books free",
    "best books on positive thinking",
  ],
  "the-science-of-getting-rich": [
    "science of getting rich free pdf",
    "wallace wattles law of attraction",
    "how to get rich mindset book",
    "manifestation books free",
    "wealth attraction books",
  ],
  meditations: [
    "meditations marcus aurelius free pdf",
    "best stoicism books",
    "how to practice stoicism",
    "marcus aurelius quotes on life",
    "best philosophy books free",
  ],
  "tao-te-ching": [
    "tao te ching free pdf",
    "lao tzu quotes",
    "best books on taoism",
    "how to practice taoism",
    "best eastern philosophy books",
  ],
  "the-bhagavad-gita": [
    "bhagavad gita free pdf english",
    "best gita quotes in english",
    "how to understand bhagavad gita",
    "best books on karma",
    "best hindu philosophy books",
  ],
  "the-art-of-war": [
    "art of war free pdf",
    "sun tzu quotes on strategy",
    "best books on strategy",
    "art of war summary",
    "best military strategy books",
  ],
  "think-and-grow-rich": [
    "think and grow rich original 1937 free pdf",
    "napoleon hill books free",
    "best books on success mindset",
    "how to think and grow rich summary",
    "best self development books 2026",
  ],
};

export const bookKeywords = (slug) => BOOK_KEYWORDS[slug] || [];