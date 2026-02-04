module.exports = function(eleventyConfig) {
  // Copy static assets
 eleventyConfig.addPassthroughCopy("css");
   eleventyConfig.addPassthroughCopy("js");
   eleventyConfig.addPassthroughCopy("images");
   eleventyConfig.addPassthroughCopy("admin");

  // Create a collection for blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_layouts",
      layouts: "_layouts"
    }
  };
};
