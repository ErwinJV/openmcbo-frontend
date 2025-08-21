import Image from "next/image";
import NavLink from "../NavLink";

const links: Readonly<{ href: string; label: string }[]> = [
  { href: "/", label: "inicios" },
  { href: "/inmuebles", label: "inmuebles" },
  { href: "/sobre-nosotros", label: "sobre nosotros" },
];

export default function NavBar() {
  return (
    <header className="w-full h-[110px] flex items-center bg-white">
      <nav className="container mx-auto  flex items-center justify-around">
        <Image
          alt="Open Mcbo Logotipo"
          src="/logos-openmcbo/logotype-blue.svg"
          width={190}
          height={54}
        />

        <ul className="flex gap-8 items-center text-[16px]">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
