"use strict";
const i = require("obsidian");

class l extends i.Plugin {
    async onload() {
        this.registerMarkdownPostProcessor(el => {
            // Find all elements that might contain text
            const targets = el.querySelectorAll("p, li, h1, h2, h3, h4, h5, h6, span, td, th");
            const e = /\/\/([^:\s]+):(.*?)\/\//g;

            targets.forEach(s => {
                // Check if the element contains the syntax before processing
                if (e.test(s.innerHTML)) {
                    s.innerHTML = s.innerHTML.replace(e, (p, a, o) => {
                        const classes = a.split(",")
                            .map(c => `hl-${c.trim().toLowerCase()}`)
                            .join(" ");
                        return `<span class="${classes}">${o}</span>`;
                    });
                }
            });
        });
    }
}

module.exports = l;
