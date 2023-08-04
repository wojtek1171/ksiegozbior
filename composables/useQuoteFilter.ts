export default function useBookFilter() {
  const filteredQuotes = ref([]);

  async function filterQuotes(quotes, filterOptions) {
    filteredQuotes.value = quotes
      .filter((quote) => quote.bookTitle?.toLowerCase().includes(filterOptions.bookTitle?.toLowerCase()))
      .filter((quote) => (filterOptions.authors ? quote.authors?.toLowerCase().includes(filterOptions.authors?.toLowerCase()) : true));
    // .filter((quote) => (filterOptions.publisher ? book.publisher?.toLowerCase().includes(filterOptions.publisher?.toLowerCase()) : true))

    if (filterOptions.tags.length > 0) {
      filteredQuotes.value = filteredQuotes.value.filter((quote) => filterOptions.tags?.some((tag) => quote.tags.includes(tag)));
    }
  }

  return {
    filteredQuotes,
    filterQuotes,
  };
}
