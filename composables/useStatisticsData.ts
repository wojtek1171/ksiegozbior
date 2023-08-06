export default function useStatisticsData() {
  const statisticsData = ref({
    booksRead: 0,
    booksTotal: 0,
    authors: {},
    publishers: {},
    tags: {},
    booksByYear: {},
    expensesByYear: {},
  });

  async function getStatisticsData() {
    const books = await $fetch('/api/books');

    const preparedData = prepareData(books);
    statisticsData.value = { ...preparedData, booksRead: getReadBooksCount(books), booksTotal: books.length };
  }

  function prepareData(books) {
    const preparedData = {
      authors: [],
      publishers: [],
      tags: [],
      expensesByYear: {
        categories: [],
        data: [],
      },
      booksByYear: {
        categories: [],
        data: [],
      },
    };

    let yearsFrom2013 = [];
    for (let year = 2013; year <= new Date().getFullYear(); year++) {
      yearsFrom2013.push({
        year: year,
        expenses: 0,
        bookCount: 0,
      });
    }

    books.forEach((book) => {
      preparedData.authors.push(book.authors.split(','));
      preparedData.publishers.push(book.publisher);
      preparedData.tags.push(book.tags.split(','));

      const yearObj = yearsFrom2013.find((x) => x.year == +book.purchaseDate.slice(0, 4));
      if (yearObj) {
        yearObj.expenses += book.purchasePrice;
        yearObj.bookCount += 1;
      }
    });

    yearsFrom2013.forEach((year) => {
      preparedData.expensesByYear.categories.push(year.year);
      preparedData.expensesByYear.data.push(year.expenses.toFixed(2));
      preparedData.booksByYear.categories.push(year.year);
      preparedData.booksByYear.data.push(year.bookCount);
    });

    preparedData.authors = getElementOccurancesSortedDesc(preparedData.authors.flat(1));
    preparedData.publishers = getElementOccurancesSortedDesc(preparedData.publishers.flat(1));
    preparedData.tags = getElementOccurancesSortedDesc(preparedData.tags.flat(1));

    return preparedData;
  }

  function getElementOccurancesSortedDesc(elements) {
    const counts = {};

    elements.forEach((el) => {
      counts[el] = counts[el] ? counts[el] + 1 : 1;
    });

    const countsSorted = Object.entries(counts)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 20);

    const finalArrays = {
      categories: [],
      data: [],
    };

    countsSorted.forEach((el) => {
      finalArrays.categories.push(el[0]);
      finalArrays.data.push(el[1]);
    });

    return finalArrays;
  }

  function getReadBooksCount(books) {
    let count = 0;
    books.forEach((book) => {
      if (book.read) {
        count += 1;
      }
    });
    return count;
  }

  return {
    statisticsData,
    getStatisticsData,
  };
}
