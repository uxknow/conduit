import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "../container";
import { MdLightMode, MdDarkMode } from "react-icons/md";

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
  const [theme, setTheme] = useState("light");

  const toggleDarkMode = () => {
    const html = document.querySelector("html");
    if (html?.classList.contains("dark")) {
      html.classList.remove("dark");
      setTheme("light");
    } else {
      html?.classList.add("dark");
      setTheme("dark");
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
            <div className="flex gap-12 items-center ">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="text-xl"
              >
                {theme === "dark" ? (
                  <MdDarkMode />
                ) : (
                  <MdLightMode className="text-black" />
                )}
              </button>
              <ul className="flex gap-4">
                {navItems.map(({ title, link }) => (
                  <li key={title}>
                    <NavLink
                      to={link}
                      className={({ isActive }) =>
                        `py-navItem  hover:text-black/80 hover:no-underline ${
                          isActive
                            ? "text-black/80 dark:text-white"
                            : "text-black/40 dark:text-neutral-400 hover:text-black/60 dark:hover:text-gray-300"
                        }`
                      }
                    >
                      {title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};
