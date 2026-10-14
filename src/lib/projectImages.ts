import "server-only";
import { openSync, readSync, closeSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Screenshots dropped into /public/projects/<slug>/ are picked up
 * automatically at build time - no code changes needed.
 *
 * - Files are shown in alphabetical order, so prefix them: 01-home.png, 02-results.png …
 * - A file named cover.* or cover-<caption>.* (e.g. cover-kitchen-display.png) becomes the card image;
 *   otherwise the first file is used.
 * - The caption is made from the file name: "02-results-table.png" → "Results table".
 * - Files with "mockup" in the name (e.g. 05-mockup-dashboard.png) are labelled as
 *   mockups, never as screenshots. Use this for designs and illustrations.
 */

const IMAGE = /\.(png|jpe?g|webp|avif|gif)$/i;

export interface FolderImage {
  src: string;
  alt: string;
  caption: string;
  isCover: boolean;
  kind: "screenshot" | "mockup";
  /** Pixel size when it can be read from the file (PNG, JPEG, WebP). */
  width?: number;
  height?: number;
}

/** Reads width/height from the first bytes of a PNG, JPEG or WebP file. */
function imageSize(path: string): { width: number; height: number } | undefined {
  const fd = openSync(path, "r");
  try {
    const buf = Buffer.alloc(64 * 1024);
    const n = readSync(fd, buf, 0, buf.length, 0);
    const b = buf.subarray(0, n);
    // PNG: IHDR
    if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    // WebP
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const chunk = b.toString("ascii", 12, 16);
      if (chunk === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
      if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
      if (chunk === "VP8L") {
        const bits = b.readUInt32LE(21);
        return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
      }
    }
    // JPEG: scan for a SOF marker
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i + 9 < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const marker = b[i + 1];
        const len = b.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
        }
        i += 2 + len;
      }
    }
  } catch {
    // unreadable - fall back to a fixed frame
  } finally {
    closeSync(fd);
  }
  return undefined;
}

function captionFrom(file: string) {
  const base = file
    .replace(IMAGE, "")
    .replace(/^\./, "")
    .replace(/^\d+[-_.\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "Screenshot";
}

export function getProjectImages(slug: string, title: string): FolderImage[] {
  let files: string[];
  try {
    files = readdirSync(join(process.cwd(), "public", "projects", slug));
  } catch {
    return [];
  }
  return files
    .filter((f) => IMAGE.test(f))
    .sort((a, b) => {
      const ca = /^cover/i.test(a) ? 0 : 1;
      const cb = /^cover/i.test(b) ? 0 : 1;
      return ca - cb || a.localeCompare(b, undefined, { numeric: true });
    })
    .map((file) => {
      const isCover = /^cover([-_.])/i.test(file);
      const isMockup = /mockup/i.test(file);
      const named = captionFrom(file.replace(/^cover[-_]?/i, "").replace(/mockup[-_]?/i, ""));
      const caption = isCover && named === "Screenshot" ? "Overview" : named;
      return {
        src: `/projects/${slug}/${encodeURIComponent(file)}`,
        alt: `${title}: ${caption}`,
        caption,
        isCover,
        kind: isMockup ? "mockup" : "screenshot",
        ...imageSize(join(process.cwd(), "public", "projects", slug, file)),
      };
    });
}

/** The image to use on the project card: cover.* first, otherwise the first file. */
export function getProjectCoverImage(slug: string, title: string) {
  const images = getProjectImages(slug, title);
  return images.find((i) => i.isCover) ?? images[0];
}
