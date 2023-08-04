export default function useBookFilter() {
  const filteredQuotes = ref([]);

  async function filterQuotes(quotes, filterOptions) {
    filteredQuotes.value = quotes
      .filter((quote) => (filterOptions.bookTitle ? quote.bookTitle?.toLowerCase().includes(filterOptions.bookTitle?.toLowerCase()) : true))
      .filter((quote) => (filterOptions.authors ? quote.authors?.toLowerCase().includes(filterOptions.authors?.toLowerCase()) : true))
      .filter((quote) => (filterOptions.tags.length > 0 ? filterOptions.tags?.some((tag) => quote.tags.includes(tag)) : true));
  }

  return {
    filteredQuotes,
    filterQuotes,
  };
}
