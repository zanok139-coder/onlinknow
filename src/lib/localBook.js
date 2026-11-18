// Local fallback - used when Base44 returns nothing
export const localBooks = [
  {
    id: "as-a-man-thinketh",
    slug: "as-a-man-thinketh",
    title: "As A Man Thinketh",
    author: "James Allen",
    description: "A classic on the power of thought.",
    cover_url: "",
    category: "Self-Help",
    published_year: 1903,
    read_minutes: 45,
    total_chapters: 7,
    views: 0,
    is_featured: true,
    status: "Published",
    source_file_url: "",
  },
];

export const localChapters = {
  "as-a-man-thinketh": [
    { id: "1", book_id: "as-a-man-thinketh", number: 1, title: "Thought and Character", content: "Put your chapter text here..." },
  ],
};

export function findLocalBook(bookId) {
  if (!bookId) return null;
  return localBooks.find((b) => b.id === bookId || b.slug === bookId) || null;
}

export function getLocalChapters(bookId) {
  return localChapters[bookId] || [];
}
