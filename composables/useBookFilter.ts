export default function useBookFilter() {
  const filteredBooks = ref([]);

  async function filterBooks(books, filterOptions) {
    filteredBooks.value = books
      .filter((book) => book.title?.toLowerCase().includes(filterOptions.title?.toLowerCase()))
      .filter((book) => (filterOptions.authors ? book.authors?.toLowerCase().includes(filterOptions.authors?.toLowerCase()) : true))
      .filter((book) => (filterOptions.publisher ? book.publisher?.toLowerCase().includes(filterOptions.publisher?.toLowerCase()) : true))
      .filter((book) => (filterOptions.translators ? book.translators?.toLowerCase().includes(filterOptions.translators?.toLowerCase()) : true))
      .filter((book) => (filterOptions.series ? book.series?.toLowerCase().includes(filterOptions.series?.toLowerCase()) : true))
      .filter((book) => (filterOptions.publSeries ? book.publSeries?.toLowerCase().includes(filterOptions.publSeries?.toLowerCase()) : true))
      .filter((book) => (filterOptions.isbn ? book.isbn?.toString().includes(filterOptions.isbn) : true))
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
