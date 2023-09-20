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

    searchHintsBundle.value.authors = getValuesWithOccurCount(authors);
    searchHintsBundle.value.publishers = getValuesWithOccurCount(publishers);
    searchHintsBundle.value.translators = getValuesWithOccurCount(translators);
    searchHintsBundle.value.series = getValuesWithOccurCount(series);
    searchHintsBundle.value.publSeries = getValuesWithOccurCount(publSeries);
    searchHintsBundle.value.tags = getValuesWithOccurCount(tags);
    searchHintsBundle.value.languages = Array.from(new Set(languages));
  }

  function getValuesWithOccurCount(array) {
    const resultArr = [];
    const counts = {};

    array.forEach((el) => {
      if (el) {
        counts[el] = counts[el] ? counts[el] + 1 : 1;
      }
    });

    const countsSorted = Object.entries(counts).sort(([_, a], [__, b]) => b - a);

    countsSorted.forEach((el) => {
      resultArr.push({ label: `${el[0]} (${el[1]})`, value: el[0] });
    });

    return resultArr;
  }

  return {
    searchHintsBundle,
    prepareSearchHints,
  };
}
