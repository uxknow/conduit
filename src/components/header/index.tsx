import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "../container";

interface INavItems {
  title: string;
  link: string;
}

const navItems: INavItems[] = [
  { title: "Home", link: "/" },
  { title: "Sign in", link: "/login" },
  { title: "Sign up", link: "/register" },
];

export const Header: FC = () => {
  const toggleDarkMode = () => {
    const html = document.querySelector("html");
    if (html?.classList.contains("dark")) {
      html.classList.remove("dark");
    } else {
      html?.classList.add("dark");
    }
  };
  return (
    <header className="bg-white dark:bg-neutral-900 dark:text-white">
      <nav className="px-2 py-4">
        <Container>
          <div className="flex justify-between items-center">
            <Link to="/" className="mr-8 text-2xl font-titillium text-green">
              conduit
            </Link>
            <ul className="flex gap-4">
              {navItems.map(({ title, link }) => (
                <li key={title}>
                  <NavLink
                    to={link}
                    className={({ isActive }) =>
                      `py-navItem dark:text-white ${
                        isActive ? "text-black/80 " : "text-black/40 dark:text-neutral-400"
                      }`
                    }
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={toggleDarkMode}>
            Mode
          </button>
        </Container>
      </nav>
    </header>
  );
};
