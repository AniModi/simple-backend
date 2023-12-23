const axios = require("axios");
const {Readability} = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const UserNews = require("../models/UserNews");
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


async function getNewsData(req, res) {
  try {
    const { url } = req.body;
    axios.get(url).then(function (r2) {
      let dom = new JSDOM(r2.data, {
        url: url,
      });

      let article = new Readability(dom.window.document).parse();

      const headline = article.title;
      const content = article.textContent;


      res.status(200).json({ headline, content });

    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function addNewsData(req, res) {
  try {

    const { email, headline, rhymingHeadline, bias, link } = req.body;


    const newNews = new UserNews({
      email,
      headline,
      rhymingHeadline,
      bias,
      link,
    });

    const savedNews = await newNews.save();

    res.status(200).json(savedNews);

  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function fetchNewsData(req, res) {
  try {
    const { email } = req.body;

    const news = await UserNews.find({ email });
    res.status(200).json(news);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getNews,
  getNewsData,
  addNewsData,
  fetchNewsData
};
