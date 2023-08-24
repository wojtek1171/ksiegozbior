import RSS from 'rss';

export default defineEventHandler(async (event) => {
  try {
    const quotes = await $fetch('/api/quotes/by_creation_desc_recent');

    // if (!quotes.ok) {
    //   throw new Error(quotes?.status);
    // }

    const feed = new RSS({
      title: 'Cytaty',
      site_url: 'https://ksiegozbior.vercel.app',
      feed_url: `https://ksiegozbior.vercel.app/quotes/rss`,
    });

    for (const quote of quotes) {
      feed.item({
        title: `${quote.bookTitle} - ${quote.authors}` || 'title',
        url: 'https://ksiegozbior.vercel.app/quotes',
        description: quote.text,
        date: quote.created,
        categories: quote.tags.split(','),
      });
    }
    const feedString = feed.xml({ indent: true });

    event.node.res.setHeader('content-type', 'text/xml');
    event.node.res.end(feedString);
  } catch (e) {
    return e;
  }
});
