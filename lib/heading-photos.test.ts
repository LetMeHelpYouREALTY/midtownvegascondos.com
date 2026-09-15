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

  it("uses community-specific photos for named market and FAQ headings", () => {
    const root = process.cwd();
    const pairs: Array<[string, string, string]> = [
      [
        "app/neighborhoods/southern-highlands/page.tsx",
        "Southern Highlands market snapshot",
        "southernHighlandsWhy",
      ],
      [
        "app/neighborhoods/southern-highlands/page.tsx",
        "Southern Highlands FAQ",
        "southernHighlandsWhy",
      ],
      [
        "app/55-plus-communities/sun-city-summerlin/page.tsx",
        "Sun City Summerlin at a Glance",
        "sunCitySummerlinAbout",
      ],
      [
        "app/55-plus-communities/trilogy-summerlin/page.tsx",
        "Trilogy at Summerlin at a Glance",
        "trilogyAbout",
      ],
      [
        "app/55-plus-communities/solera-anthem/page.tsx",
        "Solera at Anthem at a Glance",
        "soleraAbout",
      ],
      [
        "app/55-plus-communities/sun-city-anthem/page.tsx",
        "Sun City Anthem at a Glance",
        "sunCityAnthemAbout",
      ],
      [
        "app/55-plus-communities/sun-city-aliante/page.tsx",
        "Sun City Aliante at a Glance",
        "sunCityAlianteAbout",
      ],
      [
        "app/55-plus-communities/del-webb-lake-las-vegas/page.tsx",
        "Del Webb at Lake Las Vegas at a Glance",
        "delWebbAbout",
      ],
      [
        "app/relocation/page.tsx",
        "Las Vegas Schools & Education",
        "commuteTimes",
      ],
      [
        "app/55-plus-communities/sun-city-summerlin/page.tsx",
        "Why Buyers Choose Sun City Summerlin",
        "sunCitySummerlinAbout",
      ],
      [
        "app/55-plus-communities/trilogy-summerlin/page.tsx",
        "Why Buyers Choose Trilogy at Summerlin",
        "trilogyAbout",
      ],
      [
        "app/55-plus-communities/sun-city-anthem/page.tsx",
        "Sun City Anthem Amenities",
        "sunCityAnthemAbout",
      ],
      [
        "app/55-plus-communities/heritage-stonebridge/page.tsx",
        "Current Heritage at Stonebridge listings",
        "heritageWhy",
      ],
    ];

    for (const [rel, heading, key] of pairs) {
      const text = readFileSync(join(root, rel), "utf8");
      const idx = text.indexOf(heading);
      expect(idx, `${rel} missing ${heading}`).toBeGreaterThan(-1);
      const window = text.slice(Math.max(0, idx - 500), idx + heading.length);
      expect(window, `${rel} ${heading}`).toContain(`imageKey="${key}"`);
    }
  });

  it("keeps move-up and commute cards on the named community photo", () => {
    const root = process.cwd();
    const moveUp = readFileSync(
      join(root, "app/sellers/move-up/page.tsx"),
      "utf8",
    );
    expect(moveUp).toMatch(
      /heading="Fremont East → Arts District"[\s\S]{0,80}heroKey="fremontEast"/,
    );
    expect(moveUp).toMatch(
      /heading="Palms Place → Southern Highlands"[\s\S]{0,80}heroKey="palmsPlace"/,
    );
    const highlands = readFileSync(
      join(root, "app/neighborhoods/southern-highlands/page.tsx"),
      "utf8",
    );
    expect(highlands).toMatch(
      /heading="Southwest valley access"[\s\S]{0,80}sectionKey="commuteTimes"/,
    );
    const midtown = readFileSync(
      join(root, "app/neighborhoods/[slug]/page.tsx"),
      "utf8",
    );
    expect(midtown).not.toMatch(
      /heading=\{`Search \$\{area\.name\} Condos`\}[\s\S]{0,200}imageKey="searchMidtown"/,
    );
    expect(midtown).toMatch(/heading=\{`Search \$\{area\.name\} Condos`\}/);
    expect(midtown).toMatch(/src=\{getHeroImage\(heroKey\)\.src\}/);
  });
});
