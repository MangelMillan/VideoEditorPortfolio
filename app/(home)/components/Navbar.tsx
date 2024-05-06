import { SiLinkedin, SiGithub, SiInstagram } from "react-icons/si";
import Link from "next/link";

export default function Navbar() {
  const socials = [
    {
      Link: "https://www.linkedin.com/in/miguel-millán-675506307/",
      Label: "LinkedIn",
      Icon: SiLinkedin,
    },
    {
      Link: "https://github.com/MangelMillan",
      Label: "GitHub",
      Icon: SiGithub,
    },
    {
      Link: "https://www.instagram.com/miguel.millaan/",
      Label: "Instagram",
      Icon: SiInstagram,
    },
  ];

  return (
    <nav className="py-5 px-10 flex justify-between fixed top-0 w-full bg-transparent backdrop-blur-sm z-50">
      <Link href="#top">
        <h1 className="text-4xl font-bold underline underline-offset-8 decoration-red-400 -rotate-3 cursor-pointer">
          Maikī
        </h1>
      </Link>
      <div className="flex items-center gap-5 pr-12">
        {socials.map((social, index) => {
          const Icon = social.Icon;
          return (
            <Link href={social.Link} key={index} aria-label={social.Label}>
              <Icon className="w-7 h-7 hover:scale-125 transition-all" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
