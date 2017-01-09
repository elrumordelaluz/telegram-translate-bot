const TelegramBot = require('node-telegram-bot-api')
const telegram = new TelegramBot("320929120:AAHU54LQc9Sew0f6p7S7_0w7DOj_65m1qyk", { polling: true })
const translate = require('node-google-translate-skidz')

telegram.on("text", (message) => {
  translate({
    text: message.text,
    target: 'it',
  }, (result) => telegram.sendMessage(message.chat.id, result.translation))
})


telegram.on("inline_query", (query) => {
  if (query.query !== '') {
    translate({
      text: query.query,
      target: 'it',
    }, (result) => {
      telegram.answerInlineQuery(query.id, [
        {
          type: "article",
          id: "translatearticle",
          title: "Traducime esto",
          input_message_content: {
            message_text: result.translation
          }
        }
      ])
    })
  }
})
