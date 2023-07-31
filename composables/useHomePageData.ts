export default function useHomePageData() {
  const homePageData = ref({
    recentBooks: [],
    bookCount: 0,
    pagesCount: 0,
    meters: 12.8,
    purchasePriceSum: 0,
    retailPriceSum: 0,
  });

  async function getHomePageData(url: String) {
    const { data: books } = await useFetch('/api/books');

    homePageData.value.recentBooks = books.value?.slice(-10).reverse();
    homePageData.value.bookCount = books.value?.length;
    homePageData.value.pagesCount = sumField('pages', books.value);
    homePageData.value.purchasePriceSum = sumField('purchasePrice', books.value);
    homePageData.value.retailPriceSum = sumField('retailPrice', books.value);
  }

  function sumField(fieldName: string, books: Book) {
    let sum = 0;

    books.forEach((book) => {
      sum += book[fieldName];
    });

    return sum;
  }

  return {
    homePageData,
    getHomePageData,
  };
}
