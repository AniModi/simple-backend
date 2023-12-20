const OpenAI = require("openai");

const key = process.env.OPENAI_API_KEY;
const model = process.env.GPT_MODEL;

const openai = new OpenAI(key);

async function getRhyme(req, res) {
  try {
    const { headline } = req.body;
    const chat = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `

          Rhyme is an important part of many poems, to the extent that, to many people, ‘rhyme’ is synonymous with ‘poetry’. ‘Does it rhyme?’ is the question many poets have been asked when they reveal to someone else that they write poetry.

          Some examples are : 

          1) But still the worst with most regret commend,
          For each ill author is as bad a friend
          To what base ends, and by what abject ways,
          Are mortals urged, through sacred lust of praise!
          Ah, ne’er so dire a thirst of glory boast,
          Nor in the critic let the man be lost
          Good-nature and good sense must ever join;
          To err is human, to forgive, divine …

          2) He is not here; but far away
          The noise of life begins again,
          And ghastly thro’ the drizzling rain
          On the bald street breaks the blank day.

          3) Remember me when I am gone away,
          Gone far away into the silent land;
          When you can no more hold me by the hand,
          Nor I half turn to go yet turning stay.
          Remember me when no more day by day
          You tell me of our future that you plann'd:
          Only remember me; you understand
          It will be late to counsel then or pray …

          I want you to act as a news headline rhymer. Based on above knowledge and any other knowledge you possess about rhyming, you have to give me a rhyming version of the provided news headline. You shall be careful to not change the meaning of the headline. The headline is "${headline}"`,
        },
      ],
      model: model,
    });

    const response = chat.choices[0].message.content;
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
}

async function getBias(req, res) {
  try {
    const { content } = req.body;
    const chat = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `  
            Media bias is ubiquitous (everywhere) and not easy to
        detect. It is always useful to compare several sources of
        information and, in doing so, it becomes clear that media
        coverage is never completely objective.
        Here are some forms of media bias to watch for:
        • Bias by omission: For every news story that is selected, there are many others that are left
        out. Do the news stories you see show a balanced view of real life? What are the
        characteristics they have in common? (e.g., Are they mostly about violence, famous people,
        wealth?) Do some news sources include items that are ignored by others?
        • Bias by emphasis: What stories are on the front page or “at the top of the hour?” Which
        stories get the largest headlines, or the first and longest coverage on TV or radio? Consider
        how this placement influences people’s sense of what is important.
        • Bias by use of language: The use of labels such as “terrorist,” “revolutionary,” or “freedom
        fighter” can create completely different impressions of the same person or event.
        • Bias in the source: An article about a cure for cancer written by a drug company is not the
        same as an article by an independent researcher. Often, private companies, governments,
        public relations firms, and political groups produce press releases to gain media exposure and
        to influence the public.
        • Bias by repetition: The repetition of a particular event or idea can lead people to believe
        that it is true, very widespread, and much more important than it really is.
        • Bias in numbers and statistics: Statistics need to be interpreted; they are often used to
        create false impressions. Of the following statements, which statistic would you use to try to
        convince someone that the death penalty is a good idea?
                1. Almost 30% of those surveyed support the death penalty.
                2. More than 70% of those surveyed are against the death penalty..


            I want you to act as a news bias detection expert. Based on the above knowledge and any other knowledge you posses about biasness in news media, you have to give me a summary of any bias that is present in the provided news article. If the article is unbiased, report accordingly. The news article is "${content}"`,
        },
      ],
      model: model,
    });

    const response = chat.choices[0].message.content;
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
}

module.exports = {
  getRhyme,
    getBias,
};
