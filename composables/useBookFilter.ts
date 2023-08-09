export default function useBookFilter() {
  const filteredBooks = ref([]);

  async function filterBooks(books, filterOptions) {
    const usedFiltersNames = Object.getOwnPropertyNames(
      Object.fromEntries(Object.entries(filterOptions).filter(([_, v]) => !!v && v.length != 0)),
    );
    const filtersConditionArray = [
      {
        name: 'title',
        cond: (book) => book.title?.toLowerCase().includes(filterOptions.title?.toLowerCase()),
      },
      {
        name: 'authors',
        cond: (book) => book.authors?.toLowerCase().includes(filterOptions.authors?.toLowerCase()),
      },
      {
        name: 'publisher',
        cond: (book) => filterOptions.tags?.some((tag) => book.tags.includes(tag)),
      },
      {
        name: 'translators',
        cond: (book) => book.translators?.toLowerCase().includes(filterOptions.translators?.toLowerCase()),
      },
      {
        name: 'series',
        cond: (book) => book.series?.toLowerCase().includes(filterOptions.series?.toLowerCase()),
      },
      {
        name: 'publSeries',
        cond: (book) => book.publSeries?.toLowerCase().includes(filterOptions.publSeries?.toLowerCase()),
      },
      {
        name: 'isbn',
        cond: (book) => book.isbn?.toString().includes(filterOptions.isbn),
      },
      {
        name: 'readStatus',
        cond: (book) => book.read === filterOptions.readStatus.read || book.read != filterOptions.readStatus.notRead,
      },
      {
        name: 'publicationYearFrom',
        cond: (book) => book.publicationDate >= filterOptions.publicationYearFrom,
      },
      {
        name: 'publicationYearTo',
        cond: (book) => book.publicationDate <= filterOptions.publicationYearTo,
      },
      {
        name: 'purchaseDateFrom',
        cond: (book) => new Date(book.purchaseDate) >= new Date(filterOptions.purchaseDateFrom),
      },
      {
        name: 'purchaseDateTo',
        cond: (book) => new Date(book.purchaseDate) <= new Date(filterOptions.purchaseDateTo),
      },
    ];

    const usedFilters = filtersConditionArray.filter((filt) => usedFiltersNames.includes(filt.name)).map((filt) => filt.cond);
    filteredBooks.value = books.filter((q) => usedFilters.every((filt) => filt(q)));

    // filteredBooks.value = books
    //   .filter((book) => book.title?.toLowerCase().includes(filterOptions.title?.toLowerCase()))
    //   .filter((book) => (filterOptions.authors ? book.authors?.toLowerCase().includes(filterOptions.authors?.toLowerCase()) : true))
    //   .filter((book) => (filterOptions.publisher ? book.publisher?.toLowerCase().includes(filterOptions.publisher?.toLowerCase()) : true))
    //   .filter((book) => (filterOptions.translators ? book.translators?.toLowerCase().includes(filterOptions.translators?.toLowerCase()) : true))
    //   .filter((book) => (filterOptions.series ? book.series?.toLowerCase().includes(filterOptions.series?.toLowerCase()) : true))
    //   .filter((book) => (filterOptions.publSeries ? book.publSeries?.toLowerCase().includes(filterOptions.publSeries?.toLowerCase()) : true))
    //   .filter((book) => (filterOptions.isbn ? book.isbn?.toString().includes(filterOptions.isbn) : true))
    //   .filter((book) => book.read === filterOptions.read || book.read != filterOptions.notRead);

    // if (filterOptions.tags.length > 0) {
    //   filteredBooks.value = filteredBooks.value.filter((book) => filterOptions.tags?.some((tag) => book.tags.includes(tag)));
    // }
  }

  return {
    filteredBooks,
    filterBooks,
  };
}
