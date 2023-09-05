export default function useBookFilter() {
  const filteredQuotes = ref([]);

  async function filterQuotes(quotes, filterOptions) {
    const usedFiltersNames = Object.getOwnPropertyNames(
      Object.fromEntries(Object.entries(filterOptions).filter(([_, v]) => !!v && v.length != 0)),
    );
    const filtersConditionArray = [
      {
        name: 'bookTitle',
        cond: (quote) => quote.bookTitle?.toLowerCase().includes(filterOptions.bookTitle?.toLowerCase()),
      },
      {
        name: 'authors',
        cond: (quote) => quote.authors?.toLowerCase().includes(filterOptions.authors?.toLowerCase()),
      },
      {
        name: 'tags',
        cond: (quote) => filterOptions.tags?.some((tag) => quote.tags.includes(tag)),
      },
      {
        name: 'text',
        cond: (quote) => quote.text?.toLowerCase().includes(filterOptions.text?.toLowerCase()),
      },
    ];

    const usedFilters = filtersConditionArray.filter((filt) => usedFiltersNames.includes(filt.name)).map((filt) => filt.cond);
    filteredQuotes.value = quotes.filter((q) => usedFilters.every((filt) => filt(q)));

    // filteredQuotes.value = quotes
    //   .filter((quote) => (filterOptions.bookTitle ? quote.bookTitle?.toLowerCase().includes(filterOptions.bookTitle?.toLowerCase()) : true))
    //   .filter((quote) => (filterOptions.authors ? quote.authors?.toLowerCase().includes(filterOptions.authors?.toLowerCase()) : true))
    //   .filter((quote) => (filterOptions.tags.length > 0 ? filterOptions.tags?.some((tag) => quote.tags.includes(tag)) : true));
  }

  return {
    filteredQuotes,
    filterQuotes,
  };
}
