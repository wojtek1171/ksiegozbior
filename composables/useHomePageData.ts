export default function useHomePageData() {
  const homePageData = ref({
    recentBooks: [],
    authorsCount: 0,
    bookCount: 0,
    pagesCount: 0,
    meters: 12.8,
    purchasePriceSum: 0,
    retailPriceSum: 0,
    quotesCount: 0,
  });

  async function getHomePageData() {
    const books = await $fetch('/api/books/by_creation_desc');
    const quotesCount = await $fetch('/api/quotes/count');

    const preparedData = prepareData(books);

    homePageData.value.recentBooks = books?.slice(0, 10);
    homePageData.value.authorsCount = preparedData.authorsCount;
    homePageData.value.bookCount = books?.length;
    homePageData.value.pagesCount = preparedData.pagesCount;
    homePageData.value.purchasePriceSum = preparedData.purchasePriceSum;
    homePageData.value.retailPriceSum = preparedData.retailPriceSum;
    homePageData.value.quotesCount = quotesCount;
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

  return {
    homePageData,
    getHomePageData,
  };
}
