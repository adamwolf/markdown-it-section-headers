import MarkdownIt from "markdown-it";
import header_section_plugin from "../src";

let mdit = MarkdownIt();

describe("section header rule", function () {
  describe("markdown conversion", function () {
    beforeAll(() => {
      mdit = MarkdownIt().use(header_section_plugin);
    });

    it("should surround an h1 and its paragraphs with section tags", function () {
      const src = `# hello world
today is gonna be a great day`;

      const expected = `<section>
<h1>hello world</h1>
<p>today is gonna be a great day</p>
</section>
`;

      expect(mdit.render(src)).toEqual(expected);
    });

    it("should surround each h1 and its paragraphs with section tags", function () {
      const src = `# hello world
today is gonna be a great day
# goodbye world
it's time to go to bed`;

      const expected = `<section>
<h1>hello world</h1>
<p>today is gonna be a great day</p>
</section>
<section>
<h1>goodbye world</h1>
<p>it's time to go to bed</p>
</section>
`;

      expect(mdit.render(src)).toEqual(expected);
    });

    it("surrounds an h1 even if there are h2s", function () {
      const src = `# Career
lorem ipsum dolor sit amet
    
## 2005-2009: Career beginnings
alpha beta gamma delta epsilon

a ba co ĉo da

## 2009-2011: Breakthrough, Animal, and Cannibal`;

      const expected = `<section>
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
`;

      expect(mdit.render(src)).toEqual(expected);
    });
  });

  describe("headerLevels", function () {
    it("doesn't surround an h1 if it's not in the headerLevels", function () {
      const src = `# hello world
today is gonna be a great day`;

      const expected = `<h1>hello world</h1>
<p>today is gonna be a great day</p>
`;
      mdit = MarkdownIt().use(header_section_plugin, {
        headerLevels: ["h2", "h3", "h4", "h5", "h6"],
      });
      expect(mdit.render(src)).toEqual(expected);
    });

    it("works with only some headerLevels included", function () {
      const src = `## Heads and Headings
### hello world
today is gonna be a great day`;

      const expected = `<section>
<h2>Heads and Headings</h2>
<section>
<h3>hello world</h3>
<p>today is gonna be a great day</p>
</section>
</section>
`;

      mdit = MarkdownIt().use(header_section_plugin, {
        headerLevels: ["h2", "h3"],
      });
      expect(mdit.render(src)).toEqual(expected);
    });

    it("subsections end before next section", function () {
      const src = `## Heads and Headings
### hello world
today is gonna be a great day

## following header`;

      const expected = `<section>
<h2>Heads and Headings</h2>
<section>
<h3>hello world</h3>
<p>today is gonna be a great day</p>
</section>
</section>
<section>
<h2>following header</h2>
</section>
`;

      mdit = MarkdownIt().use(header_section_plugin, {
        headerLevels: ["h2", "h3"],
      });
      expect(mdit.render(src)).toEqual(expected);
    });

    it("subsections only end their subsection when there's a new subsection header", function () {
      const src = `## Heads and Headings
### hello world
today is gonna be a great day

### goodbye world
today is not a great day

## following header`;

      const expected = `<section>
<h2>Heads and Headings</h2>
<section>
<h3>hello world</h3>
<p>today is gonna be a great day</p>
</section>
<section>
<h3>goodbye world</h3>
<p>today is not a great day</p>
</section>
</section>
<section>
<h2>following header</h2>
</section>
`;

      mdit = MarkdownIt().use(header_section_plugin, {
        headerLevels: ["h2", "h3"],
      });
      expect(mdit.render(src)).toEqual(expected);
    });

    it("ignores low level headers if not included in headerlevels", function () {
      const src = `## Heads and Headings
### hello world
today is gonna be a great day

### goodbye world
today is not a great day

## following header

second level headers are the best
`;

      const expected = `<section>
<h2>Heads and Headings</h2>
<h3>hello world</h3>
<p>today is gonna be a great day</p>
<h3>goodbye world</h3>
<p>today is not a great day</p>
</section>
<section>
<h2>following header</h2>
<p>second level headers are the best</p>
</section>
`;

      mdit = MarkdownIt().use(header_section_plugin, {
        headerLevels: ["h1", "h2"],
      });
      expect(mdit.render(src)).toEqual(expected);
    });
  });
});
