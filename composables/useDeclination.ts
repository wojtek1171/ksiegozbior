export default function useDeclination() {
  function declineBook(booksCount) {
    if (booksCount === 1) {
      return 'książka';
    } else if (booksCount % 10 === 2 || booksCount % 10 === 3 || booksCount % 10 === 4) {
      return 'książki';
    }
    return 'książek';
  }

  function declineQuote(quotesCount) {
    if (quotesCount === 1) {
      return 'cytat';
    } else if (quotesCount % 10 === 2 || quotesCount % 10 === 3 || quotesCount % 10 === 4) {
      return 'cytaty';
    }
    return 'cytatów';
  }

  function declinePage(pagesCount) {
    if (pagesCount === 1) {
      return 'stronę';
    } else if (pagesCount % 10 === 2 || pagesCount % 10 === 3 || pagesCount % 10 === 4) {
      return 'strony';
    }
    return 'stron';
  }

  function declineAuthor(authorsCount) {
    if (authorsCount === 1) {
      return 'autora';
    }
    return 'autorów';
  }

  function declineShelves(shelvesCount) {
    if (shelvesCount === 1) {
      return 'półkę';
    } else if (shelvesCount % 10 === 2 || shelvesCount % 10 === 3 || shelvesCount % 10 === 4) {
      return 'półki';
    }
    return 'półek';
  }

  function attributesWithComma(index, array) {
    if (index !== array.length - 1) {
      return `${array[index]},`;
    } else {
      return array[index];
    }
  }

  function commaInbetween(index, array) {
    if (index !== array.length - 1) {
      return ', ';
    }
  }

  return {
    declineBook,
    declineQuote,
    declinePage,
    declineAuthor,
    declineShelves,
  };
}
