export default function useBookFilter() {
  const filteredBooks = ref([]);

  async function filterBooks(books, filterOptions) {
    filteredBooks.value = books
      .filter((book) => book.title.toLowerCase().includes(filterOptions.title.toLowerCase()))
      .filter((book) => book.publisher.toLowerCase().includes(filterOptions.publisher.toLowerCase()))
      .filter((book) => book.read === filterOptions.read || book.read != filterOptions.notRead);

    if (filterOptions.tags.length > 0) {
      filteredBooks.value = filteredBooks.value.filter((book) => filterOptions.tags?.some((tag) => book.tags.includes(tag)));
    }
  }

  return {
    filteredBooks,
    filterBooks,
  };
}
