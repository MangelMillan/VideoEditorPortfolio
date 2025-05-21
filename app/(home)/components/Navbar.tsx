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
    <nav className="py-6 px-4 sm:px-8 lg:px-10 flex justify-between items-center fixed top-0 w-full bg-transparent backdrop-blur-sm z-50 max-w-7xl mx-auto left-0 right-0">
      <Link href="/">
        <h1 className="text-4xl font-bold underline underline-offset-8 decoration-yellow-300 -rotate-3 cursor-pointer">
          Maikī
        </h1>
      </Link>
      <div className="flex items-center gap-5">
        {socials.map((social, index) => {
          const Icon = social.Icon;
          return (
            <Link href={social.Link} key={index} aria-label={social.Label} target="_blank" rel="noopener noreferrer">
              <Icon className="w-7 h-7 hover:scale-125 transition-all" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
