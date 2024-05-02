import Link from "next/link";
import Image from "next/image";
import MainHeaderBackground from "./MainHeaderBackground";
import logoImg from "@/assets/logo.png";
import classes from "./mainHeader.module.css";
import NavLink from "./NavLink";
export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          {/* <img src={logoImg.src} alt="A plate with foods on it" /> */}
          <Image src={logoImg} alt="A plate with foods on it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
