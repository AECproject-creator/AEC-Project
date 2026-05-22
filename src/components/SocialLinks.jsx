import { SiDiscord, SiLine, SiTiktok, SiX, SiYoutube } from "react-icons/si";
import { socials } from "../data/siteData.js";

const items = [
  ["X", socials.x, SiX],
  ["YouTube", socials.youtube, SiYoutube],
  ["TikTok", socials.tiktok, SiTiktok],
  ["Discord", socials.discord, SiDiscord],
  ["LINE", socials.line, SiLine]
];

export default function SocialLinks() {
  return (
    <div className="socials" aria-label="Official social links">
      {items.map(([label, href, Icon]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon />
        </a>
      ))}
    </div>
  );
}
