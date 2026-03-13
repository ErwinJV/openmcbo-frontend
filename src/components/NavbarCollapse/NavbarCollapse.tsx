import NavLink from "../NavLink";

interface NavbarCollapseProps {
  open: boolean;
  toggle: () => void;
}

const links: Readonly<{ href: string; label: string }[]> = [
  { href: "/", label: "inicio" },
  { href: "/inmuebles", label: "inmuebles" },
  { href: "/sobre-nosotros", label: "sobre nosotros" },
];

export default function NavbarCollapse({ open, toggle }: NavbarCollapseProps) {
  return (
    <ul
      className={` ${
        !open ? "navbar-sm-collapse" : ""
      }  z-50 absolute h-[calc(100vh-80px)]  md:h-[calc(100vh-160px)]  lg:h-[calc(100vh-110px)] bottom-[calc(-100vh+80px)] md:hidden md:bottom-[calc(-100vh+160px)]  lg:bottom-[calc(-100vh+110px)] right-0 w-[268px]  flex flex-col md:items-center bg-[#F5F7FB] py-9 px-8 space-y-4 transition delay-150 duration-300 ease-in-out `}
    >
      {links.map((link) => (
        <li key={link.href}>
          <NavLink href={link.href} label={link.label} onClick={toggle} />
        </li>
      ))}
    </ul>
  );
}
