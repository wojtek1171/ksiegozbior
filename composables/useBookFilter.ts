export default function useBookFilter() {
  const filteredBooks = ref([]);

  async function filterBooks(books, filterOptions) {
    filteredBooks.value = books
      .filter((book) => book.title?.toLowerCase().includes(filterOptions.title.toLowerCase()))
      .filter((book) => book.authors?.toLowerCase().includes(filterOptions.authors.toLowerCase()))
      .filter((book) => book.publisher?.toLowerCase().includes(filterOptions.publisher.toLowerCase()))
      .filter((book) => book.translators?.toLowerCase().includes(filterOptions.translators.toLowerCase()))
      .filter((book) => (filterOptions.series ? book.series?.toLowerCase().includes(filterOptions.series?.toLowerCase()) : true))
      .filter((book) => (filterOptions.publSeries ? book.publSeries?.toLowerCase().includes(filterOptions.publSeries?.toLowerCase()) : true))
      //.filter((book) => book.isbn.toString().includes(filterOptions.isbn))
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
