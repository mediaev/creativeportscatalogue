const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');

module.exports = (eleventyConfig) => {

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
  .use(markdownItFootnote);

  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addPassthroughCopy('./content/assets');
  eleventyConfig.addPassthroughCopy({'./src/css': 'css'});
  eleventyConfig.addPassthroughCopy({'./src/js': 'js'});

  eleventyConfig.addCollection('chapters', collection => {
    return collection
      .getFilteredByGlob('./content/chapters/*.md')
      .sort((a, b) => (Number(a.data.weight) > Number(b.data.weight) ? 1 : -1));
  });

  eleventyConfig.addCollection('pages', collection => {
    return collection
      .getFilteredByGlob('./content/pages/*.md')
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: './content',
      data: 'data',
      output: './public',
      includes: '../src/includes/',
      layouts: '../src/layouts/',
    }
  }
};
