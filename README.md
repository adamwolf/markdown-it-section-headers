# Markdown-It Section Headers

<!-- [![ci-badge]][ci-link] -->
<!-- [![npm-badge]][npm-link] -->

A [markdown-it] plugin to add <sections> around headers

Turn
```markdown
# Career
lorem ipsum dolor sit amet
    
## 2005-2009: Career beginnings
alpha beta gamma delta epsilon

a ba co ĉo da

## 2009-2011: Breakthrough, Animal, and Cannibal
```

into

```html
<section>
<h1>Career</h1>
<p>lorem ipsum dolor sit amet</p>
<section>
<h2>2005-2009: Career beginnings</h2>
<p>alpha beta gamma delta epsilon</p>
<p>a ba co ĉo da</p>
</section>
<section>
<h2>2009-2011: Breakthrough, Animal, and Cannibal</h2>
</section>
</section>
```

I wanted to generate some HTML with `section` tags using [markdown-it] that would be mostly compatible with [Tufte CSS]. This unofficial plugin was one of the steps.

This plugin doesn't help you plaace sections arbitrarily--it assumes every header is at the beginning of a section, and that sections for an `h3`, for instance, go inside the section for the `h2` above it. (You *can* specify which header levels get sections.)

This project is not "production-quality" and does not make any guarantees.

## Usage

In [Eleventy]:

Install markdown-it-section-headers through yarn or npm or however you like to install Javascript packages.

Edit your config, often `.eleventy.js`, to add the plugin to markdown-it. It may look something like:

```javascript
const markdownItSectionHeaders = require("markdown-it-section-headers");

module.exports = function(eleventyConfig) {
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItSectionHeaders));
};
```

See https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins for guidance on adding markdown-it plugins to Eleventy.

As a Node module:

```javascript
import MarkdownIt from "markdown-it"
import markdownitSectionHeaders from "markdown-it-section-headers"

const text = MarkdownIt().use(markdownitSectionsHeader).render("# hello world\ntoday's gonna be a great day")
```

<!--
In the browser:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Example Page</title>
        <script src="https://cdn.jsdelivr.net/npm/markdown-it@12/dist/markdown-it.min.js"></script>
        <script src="https://unpkg.com/markdown-it-header-sections"></script>
    </head>
    <body>
        <div id="demo"></div>
        <script>
            const text = window.markdownit().use(window.markdownitExample).render("## hello world\ntoday's gonna be a great day");
            document.getElementById("demo").innerHTML = text
        </script>
    </body>
</html>
```

# TODO options

-->

## Other work

This plugin was inspired by [markdown-it-header-sections].  You should probably start there.  I'm not sure that this project is better than [markdown-it-header-sections] in any way. 

## Development

This was started from https://github.com/executablebooks/markdown-it-plugin-template/commit/de4468a5c5f6d8e970d2f1cd2e2a1a6dec3ea8f2. I do not know Typescript and am not very good with Javascript or knowledgeable about the Javascript ecosystem. Your help is appreciated. If I suggest using frobnitz and I shouldn't, please open an issue and let me know.

If you have a question or suggestion, please open an issue.

### Getting Started

1. Check out this repository.
2. Install the `node_module` dependencies: `npm install` or `npm ci` (see [Install a project with a clean slate](https://docs.npmjs.com/cli/v7/commands/npm-ci)).
3. Run code formatting: `npm run format` and linting: `npm run lint:fix`.
4. Run the unit tests: `npm test`, or with coverage; `npm test -- --coverage`.

Now that you know things are good in your environment, make changes to the code, write some tests, and run the tests again.

At the time, it didn't seem like Markdown-it had great documentation on how to write plugins. I found other plugins and the source to be helpful. I would love to have better documentation to point folks at, and to review what has been done here.

<!--
### GitHub Actions

On commits or pull requests to the `main` branch, the GitHub Actions will run, performing linting, unit tests, and build tests.

-->

### Updating dependencies

`npm outdated` will show packages where newer versions are available.

`npx npm-check-updates` will look at the version specifiers in `package.json` and report potential updates.

`npx npm-check-updates -u` will update the version specifiers in `package.json` to the latest versions without caring at all about what your version specifiers are. Use your head.

`npm install` will install updates per `package.json` and update `package-lock.json`.

<!--
### Releases

* Update the version using `npm version $VERSIONTYPE -m "release: v$VERSION"`
* Push to GitHub: `git push --follow-tags`
* Build the package: `npm run build`
* Publish to NPM: `npm publish`

-->

#
[ci-badge]: https://github.com/adamwolf/markdown-it-section-headers/workflows/CI/badge.svg
[ci-link]: https://github.com/adamwolf/markdown-it-section-headers/actions
[npm-badge]: https://img.shields.io/npm/v/markdown-it-section-headers.svg
[npm-link]: https://www.npmjs.com/package/markdown-it-section-headers

[GitHub Actions]: https://docs.github.com/en/actions
[GitHub Pages]: https://docs.github.com/en/pages
[npm]: https://www.npmjs.com
[unpkg]: https://unpkg.com/

[markdown-it]: https://github.com/markdown-it/markdown-it
[Tufte CSS]: https://edwardtufte.github.io/tufte-css/
[markdown-it-header-sections]: https://github.com/arve0/markdown-it-header-sections
[tufte-pandoc-css]: https://github.com/jez/tufte-pandoc-css
[tufte-markdown]: https://github.com/duzyn/tufte-markdown
[Eleventy]: https://www.11ty.dev/