const password = 141517;

module.exports = {
  urls: process.env.DATABASE_URL || `mongodb+srv://huytung:${password}@cluster0.szpdftl.mongodb.net/advanced_web_2022_midterm?retryWrites=true&w=majority`,
  port: 27017,
};
