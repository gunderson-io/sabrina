// The Circus: Sabrina's blog, built with Eleventy.
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // URLs keep the old Jekyll shape: /YYYY/MM/DD/slug.html (taken from the file name)
  eleventyConfig.addFilter("datePath", (inputPath) => {
    const m = /(\d{4})-(\d{2})-(\d{2})-/.exec(inputPath.split("/").pop());
    return m ? `${m[1]}/${m[2]}/${m[3]}` : "";
  });
  eleventyConfig.addFilter("longDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("excerpt", (html) => {
    const text = String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text.length > 220 ? text.slice(0, 220).replace(/\s\S*$/, "") + "…" : text;
  });

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date));

  return {
    pathPrefix: "/sabrina/",
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
