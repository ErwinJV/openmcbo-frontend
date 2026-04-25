import Link from "next/link";
import Image from "next/image";

import NavLink from "../NavLink";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";

const links: Readonly<{ href: string; label: string }[]> = [
  { href: "/", label: "inicio" },
  { href: "/inmuebles", label: "inmuebles" },
  { href: "/sobre-nosotros", label: "sobre nosotros" },
];

const socialLinks: Readonly<
  { href: string; label: string; icon: React.ReactNode }[]
> = [
  {
    href: "#",
    label: "Facebook",
    icon: <IoLogoFacebook className="text-[#3559B6] text-2xl" />,
  },

  {
    href: "https://www.instagram.com/openmcbo",
    label: "Instagram",
    icon: <IoLogoInstagram className="text-[#3559B6] text-2xl" />,
  },
];

export default function Footer() {
  return (
    <footer className="w-full max-h-92  bg-white pt-12" id="footer">
      <div className="w-full flex flex-col  container mx-auto ">
        <nav className="w-full mx-auto  space-y-5  flex flex-col lg:flex-row lg:space-y-0  items-center justify-around pb-8 ">
          <Link href="/">
            <Image
              alt="Open Mcbo Logotipo"
              className="w-[190px]"
              src="/logos-openmcbo/logotype-blue.svg"
              width={190}
              height={54}
              priority
            />
          </Link>

          <ul className="flex gap-8 items-center text-[16px]">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
          <ul className="flex space-x-4">
            {socialLinks.map((link) => (
              <li
                key={link.href}
                className="w-10 h-10 bg-[#E3E8F5] flex items-center justify-center "
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-full "
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <hr className="w-78 md:w-170 lg:w-full mx-auto text-[#C5C6D0] h-[2px]" />
        <div className="py-5">
          <p className="text-center text-[12px] py-4 text-[#6B8CED]">
            &copy; {new Date().getFullYear()} Open Maracaibo. | Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
