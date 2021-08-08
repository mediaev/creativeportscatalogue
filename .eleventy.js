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

  // Replace the way footnote references are rendered inline
  markdownLibrary.renderer.rules.footnote_caption = function (tokens, idx) {
    var n = Number(tokens[idx].meta.id + 1).toString();
    if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId;
    }
    return  n;
  };

  markdownLibrary.renderer.rules.footnote_block_open = function (tokens, idx, options) {
  return '<section class="footnotes">\n' +
         '<h5>References</h5>\n' +
         '<ol class="footnotes-list">\n';
  };

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
