import MarkdownIt from "markdown-it";
import type { RenderRule } from "markdown-it/lib/renderer";
import type Token from "markdown-it/lib/token";
import { nanoid } from "nanoid";

export default function svg(md: MarkdownIt) {
  function isSvg(token: Token): boolean {
    return token.info === 'svg' || getLangName(token.info) === 'svg';
  }

  function getLangName(info: string): string {
    return info.split(/\s+/g)[0];
  }

  const originalFence = md.renderer.rules.fence;

  md.renderer.rules.fence = ((tokens: Token[], idx: number, options: any, env: any, self: any) => {
    const token = tokens[idx];

    if (!isSvg(token)) {
      return originalFence ? originalFence(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options);
    }

    const id = 'svg-' + nanoid();
    const svgContent = token.content.trim();

    try {
      // Check if the content is valid SVG
      if (!svgContent.startsWith('<svg') || !svgContent.endsWith('</svg>')) {
        throw new Error('Invalid SVG content');
      }

      // Create a container for the SVG
      const containerHtml = `<div class="markdown-svg" id="${id}">${svgContent}</div>`;

      // Optionally, you can add some JavaScript to adjust SVG size if needed
      const script = `
        <script>
          (function() {
            var svg = document.querySelector('#${id} svg');
            if (svg) {
              svg.setAttribute('width', '100%');
              svg.setAttribute('height', 'auto');
            }
          })();
        </script>
      `;

      return containerHtml + script;
    } catch (err) {
      console.error('Error rendering SVG:', err);
      return `<pre class="alert alert-danger">Error rendering SVG: ${err}</pre>`;
    }
  }) as RenderRule;
}
