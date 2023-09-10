export default function useBookSearchHints() {
  const searchHintsBundle = ref({
    authors: [],
    publishers: [],
    translators: [],
    series: [],
    publSeries: [],
    tags: [],
    languages: [],
  });

  //param made optional to avoid double books fetching in search page
  async function prepareSearchHints(books?) {
    if (books === undefined) {
      books = await $fetch('/api/books/for_search');
    }

    let authors = [];
    let publishers = [];
    let translators = [];
    let series = [];
    let publSeries = [];
    let tags = [];
    let languages = [];

    books.forEach((book) => {
      authors = authors.concat(book.authors?.split(','));
      publishers.push(book.publisher);
      translators = translators.concat(book.translators?.split(','));
      series.push(book.series);
      publSeries.push(book.publSeries);
      tags = tags.concat(book.tags?.split(','));
      languages.push(book.language);
    });

    searchHintsBundle.value.authors = Array.from(new Set(authors));
    searchHintsBundle.value.publishers = Array.from(new Set(publishers));
    searchHintsBundle.value.translators = Array.from(new Set(translators));
    searchHintsBundle.value.series = Array.from(new Set(series));
    searchHintsBundle.value.publSeries = Array.from(new Set(publSeries));
    searchHintsBundle.value.tags = Array.from(new Set(tags));
    searchHintsBundle.value.languages = Array.from(new Set(languages));
  }

  return {
    searchHintsBundle,
    prepareSearchHints,
  };
}
