export default function useBookSearchHints() {
  const searchHintsBundle = ref({
    authors: [],
    publishers: [],
    translators: [],
    series: [],
    publSeries: [],
    tags: [],
  });

  async function prepareSearchHints() {
    const { data: books } = await useFetch('/api/books');
    //const preparedData = prepareData(books?.value);

    let authors = [];
    let publishers = [];
    let translators = [];
    let series = [];
    let publSeries = [];
    let tags = [];

    books.value.forEach((book) => {
      authors = authors.concat(book.authors?.split(','));
      publishers.push(book.publisher);
      translators = translators.concat(book.translators?.split(','));
      series.push(book.series);
      publSeries.push(book.publSeries);
      tags = tags.concat(book.tags?.split(','));
    });

    searchHintsBundle.value.authors = Array.from(new Set(authors));
    searchHintsBundle.value.publishers = Array.from(new Set(publishers));
    searchHintsBundle.value.translators = Array.from(new Set(translators));
    searchHintsBundle.value.series = Array.from(new Set(series));
    searchHintsBundle.value.publSeries = Array.from(new Set(publSeries));
    searchHintsBundle.value.tags = Array.from(new Set(tags));
  }

  return {
    searchHintsBundle,
    prepareSearchHints,
  };
}
