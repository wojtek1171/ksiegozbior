export default function useQuoteSearchHints() {
  const searchHintsBundle = ref({
    authors: [],
    bookTitles: [],
    tags: [],
  });

  async function prepareSearchHints() {
    const { data: quotes } = await useFetch('/api/quotes');

    let authors = [];
    let bookTitles = [];
    let tags = [];

    quotes.value.forEach((quote) => {
      authors = authors.concat(quote.authors?.split(','));
      bookTitles.push(quote.bookTitle);
      tags = tags.concat(quote.tags?.split(','));
    });

    searchHintsBundle.value.authors = Array.from(new Set(authors));
    searchHintsBundle.value.bookTitles = Array.from(new Set(bookTitles));
    searchHintsBundle.value.tags = Array.from(new Set(tags));
  }

  return {
    searchHintsBundle,
    prepareSearchHints,
  };
}
