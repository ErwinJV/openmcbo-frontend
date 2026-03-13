"use client";
import { IoMenu } from "react-icons/io5";
import IconButton from "../IconButton";
import { useCallback, useEffect, useState } from "react";
import NavbarCollapse from "../NavbarCollapse";
import { toggleScroll } from "@/helpers/toggle-scroll";

export default function Wrapper() {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = useCallback(() => {
    toggleScroll(open);
    setOpen((value) => !value);
  }, [open]);

  useEffect(() => {
    return () => {
      toggleScroll(true);
    };
  }, []);

  return (
    <>
      <IconButton
        onClick={toggle}
        icon={<IoMenu className="text-[#003593]" size={26} />}
      />
      <NavbarCollapse open={open} toggle={toggle} />
    </>
  );
}
