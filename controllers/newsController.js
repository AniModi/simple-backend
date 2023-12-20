const key = process.env.NEWS_API_KEY;

async function getNews(req, res) {
  try {
    const news = await fetch(
      `https://newsdata.io/api/1/news?apikey=${key}&country=in&language=en&domain=toi`
    );
    const newsJson = await news.json();

    const results = newsJson.results;

    const data = [];

    for (let i = 0; i < results.length; i++) {
      data.push({
        headline: results[i].title,
        link: results[i].link,
        content: results[i].content,
      });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
}

module.exports = {
  getNews,
};
