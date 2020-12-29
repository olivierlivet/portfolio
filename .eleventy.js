const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget("./_tmp/style.css");
    eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
    eleventyConfig.addShortcode("version", function () {
        return String(Date.now());
    });

    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("img");
    // Copy `vercel.json` 
    eleventyConfig.addPassthroughCopy("vercel.json");

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (
          process.env.ELEVENTY_PRODUCTION &&
          outputPath &&
          outputPath.endsWith(".html")
        ) {
          let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
          });
          return minified;
        }
        return content;
    });

    eleventyConfig.addPassthroughCopy({
        "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
      });
};