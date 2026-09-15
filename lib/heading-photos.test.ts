import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function walkTsx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTsx(full));
    } else if (entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

describe("live heading photography", () => {
  it("places a heading photo immediately above each H2 on live surfaces", () => {
    const root = process.cwd();
    const files = [
      ...walkTsx(join(root, "app")),
      ...walkTsx(join(root, "components/sections")),
      ...walkTsx(join(root, "components/realscout")),
      ...walkTsx(join(root, "components/layouts")),
    ];
    const h2Re = /<h2\b/g;
    const gaps: string[] = [];

    for (const file of files) {
      const rel = file.slice(root.length + 1);
      const text = readFileSync(file, "utf8");
      let match: RegExpExecArray | null;
      h2Re.lastIndex = 0;
      while ((match = h2Re.exec(text))) {
        const window = text.slice(Math.max(0, match.index - 1800), match.index);
        if (!/<(SectionPhoto|HeadingCardPhoto|PageHero)\b/.test(window)) {
          gaps.push(`${rel}@${match.index}`);
        }
      }
    }

    expect(gaps).toEqual([]);
  });
});
