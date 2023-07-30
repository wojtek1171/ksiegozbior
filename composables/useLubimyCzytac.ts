export default function useLubimyCzytac() {
  const parsedData = ref({
    title: '',
    authors: [],
    publisher: '',
    category: [],
    publicationDate: '',
    pages: '',
    translators: [],
    originalTitle: '',
    tags: [],
    series: '',
    publSeries: '',
    isbn: '',
    note: '',
    description: '',
    image: '',
  });

  async function getLcData(url: String) {
    const trimmedUrl = url.slice(8).replaceAll('/', '&');
    console.log(trimmedUrl);

    const { data } = await useFetch(`/api/lc/${trimmedUrl}`);

    const stringData = data.value;

    parsedData.value.title = stringData
      .match(new RegExp('<h1 class="book__title"' + '(.*?)' + '</h1></div>'))[1]
      .split('>')[1]
      .trim();
    parsedData.value.authors = stringData.match(new RegExp('books:author" content="' + '(.*?)' + '" /><meta property'))[1].split(',&nbsp;');
    parsedData.value.publisher = stringData.match(new RegExp('Wydawnictwo: ' + '(.*?)' + '</'))[1].split('>')[1];
    parsedData.value.category = stringData
      .match(new RegExp('class="book__category' + '(.*?)' + '</'))[1]
      .split('>')[1]
      .trim()
      .split(', ');
    parsedData.value.pages = stringData.match(new RegExp('numberOfPages":"' + '(.*?)' + '"'))[1];
    parsedData.value.publicationDate = stringData.match(new RegExp('datePublished":"' + '(.*?)' + '"'))[1];
    parsedData.value.publSeries = stringData.match(new RegExp('Seria:' + '(.*?)' + '</'))?.[1]?.split('>')[1];
    parsedData.value.series = stringData
      .match(new RegExp('Cykl:' + '(.*?)' + '</'))?.[1]
      ?.split('>')[1]
      .trim();
    parsedData.value.isbn = stringData.match(new RegExp('isbn":"' + '(.*?)' + '"'))[1];
    parsedData.value.tags = stringData.match(/(?<=class="btn btn-outline-primary tag mt-2 mb-0">)(.*?)(?=<\/a>)/g)?.map((e) => e.trim());
    parsedData.value.note = stringData.match(new RegExp('books:rating:value" content="' + '(.*?)' + '" />'))?.[1];
    parsedData.value.description = stringData.match(new RegExp('<div class="collapse-content"><p>' + '(.*?)' + '</p>'))[1]?.trim();
    parsedData.value.image = stringData.match(new RegExp('og:image" content="' + '(.*?)' + '" />'))[1];
    parsedData.value.translators = stringData.match(new RegExp('Tłumacz:(.*?)</a></dd>'))?.[1]?.replace(/<.*?>/g, '')?.split(', ');
    parsedData.value.originalTitle = stringData
      .match(new RegExp('Tytuł oryginału:' + '(.*?)' + '</dd'))?.[1]
      ?.split('d>')[1]
      .trim();
  }

  return {
    parsedData,
    getLcData,
  };
}
