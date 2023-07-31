export default function useHomePageData() {
  const homePageData = ref({
    recentBooks: [],
    authorsCount: 0,
    bookCount: 0,
    pagesCount: 0,
    meters: 12.8,
    purchasePriceSum: 0,
    retailPriceSum: 0,
  });

  async function getHomePageData() {
    const { data: books } = await useFetch('/api/books/by_creation_desc');
    const preparedData = prepareData(books?.value);

    homePageData.value.recentBooks = books.value?.slice(0, 10);
    homePageData.value.authorsCount = preparedData.authorsCount;
    homePageData.value.bookCount = books.value?.length;
    homePageData.value.pagesCount = preparedData.pagesCount;
    homePageData.value.purchasePriceSum = preparedData.purchasePriceSum;
    homePageData.value.retailPriceSum = preparedData.retailPriceSum;
  }

  function prepareData(books) {
    const preparedData = {
      authorsCount: [],
      pagesCount: 0,
      purchasePriceSum: 0,
      retailPriceSum: 0,
    };

    books.forEach((book) => {
      preparedData.authorsCount = preparedData.authorsCount.concat(book.authors.split(','));
      preparedData.pagesCount += book.pages;
      preparedData.purchasePriceSum += book.purchasePrice;
      preparedData.retailPriceSum += book.retailPrice;
    });
    preparedData.authorsCount = new Set(preparedData.authorsCount).size;

    return preparedData;
  }

  function sumField(fieldName: string, books: Book) {
    let sum = 0;

    books.forEach((book) => {
      sum += book[fieldName];
    });

    return sum;
  }

  function countAuthors(books: Book) {
    let authors = [];

    books.forEach((book) => {
      authors = authors.concat(book.authors.split(','));
    });

    return new Set(authors).size;
  }

  return {
    homePageData,
    getHomePageData,
  };
}
