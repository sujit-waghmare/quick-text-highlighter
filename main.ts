import { Plugin } from 'obsidian';

export default class HighlighterPlugin extends Plugin {
    async onload() {
        this.registerMarkdownPostProcessor((element) => {
            const targets = element.querySelectorAll("p, li, h1, h2, h3, h4, h5, h6, span, td, th");

            targets.forEach((el) => {
                const rawHtml = el.innerHTML;
                const regex = /\/\/([^:\s]+):(.*?)\/\//g;

                if (regex.test(rawHtml)) {
                    const newHtml = rawHtml.replace(regex, (match, settings, content) => {
                        const classes = settings.split(',')
                            .map((s) => `hl-${s.trim().toLowerCase()}`)
                            .join(' ');
                        return `<span class="${classes}">${content}</span>`;
                    });
                    el.innerHTML = newHtml;
                }
            });
        });
    }
}


