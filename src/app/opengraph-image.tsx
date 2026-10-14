import { site } from "@/data/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: "Hi, I\u2019m Anastasija.",
    footer: "Computer Science · Tallinn University",
  });
}
