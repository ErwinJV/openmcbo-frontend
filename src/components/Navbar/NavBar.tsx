import Image from "next/image";
import NavLink from "../NavLink";
import Wrapper from "./Wrapper";
import Link from "next/link";

const links: Readonly<{ href: string; label: string }[]> = [
  { href: "/", label: "inicio" },
  { href: "/inmuebles", label: "inmuebles" },
  { href: "/sobre-nosotros", label: "sobre nosotros" },
];

export default function NavBar() {
  return (
    <header
      className="w-full h-[80px] md:h-[160px] lg:h-[110px] flex md:items-center bg-white relative"
      id="navbar"
    >
      <nav className="container mx-auto  flex md:flex-col lg:flex-row  items-center justify-around">
        <Link href="/">
          <Image
            alt="Open Mcbo Logotipo"
            className="mb-4 lg:mb-0 w-[128.25px] md:w-[190px]"
            src="/logos-openmcbo/logotype-blue.svg"
            width={190}
            height={54}
            priority
          />
        </Link>

        <ul className="hidden md:flex  gap-8 items-center text-[16px]">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
        <Wrapper />
      </nav>
    </header>
  );
}
