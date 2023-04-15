import type MarkdownIt from "markdown-it/lib";
import type StateCore from "markdown-it/lib/rules_core/state_core";
import Token from "markdown-it/lib/token";

/**
 * A markdown-it plugin that splits a document into sections using headers
 */

function makeSectionCloseToken(state: StateCore) {
  const sectionClose = new state.Token("section_close", "section", -1);
  sectionClose.block = true;
  return sectionClose;
}
function makeSectionHeaderRule(headerLevels: string[]) {
  // We want to be able to take options, so we wrap the rule up here

  return function sectionHeaderRule(state: StateCore): boolean {
    const tokens: Token[] = [];

    const openSections: number[] = [];

    // Is there a way to use something we already have to figure out the levels, rather than do it this way?
    // It's been a few months since I've used markdown-it's guts, so I don't remember...

    for (const token of state.tokens) {
      // TODO:  handle <section> in the markdown, added by something else
      // if (token.type === "section_open") {
      //   inSection = true
      // }

      if (token.type === "heading_open" && headerLevels.includes(token.tag)) {
        const newLevel = parseInt(token.tag[1]);

        // if new level is equal to current level, we need to close one section
        // if new level is higher than current level, i.e. h3 after h2, we don't close any sections
        // if new level is lower than current level, we may need to close multiple sections

        while (openSections.length > 0) {
          const currentLevel = openSections[openSections.length - 1];
          if (newLevel <= currentLevel) {
            tokens.push(makeSectionCloseToken(state));
            openSections.pop();
          } else {
            break;
          }
        }
        openSections.push(newLevel);
        // prepend with a section tag
        const sectionToken = new state.Token("section_open", "section", 1);
        sectionToken.block = true;
        tokens.push(sectionToken);
      }

      tokens.push(token);
    }

    while (openSections.length > 0) {
      const sectionClose = makeSectionCloseToken(state);
      tokens.push(sectionClose);
      openSections.pop();
    }

    // TODO don't do this, just insert them as we go
    state.tokens = tokens;

    return true;
  };
}

const header_section_plugin = function (
  md: MarkdownIt,
  opts: { headerLevels: string[] }
): void {
  const options = Object.assign(
    {},
    { headerLevels: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    opts
  ); // Set defaults

  md.core.ruler.push(
    "sectionHeaders",
    makeSectionHeaderRule(options.headerLevels)
  );
};

export default header_section_plugin;
module.exports = header_section_plugin;
