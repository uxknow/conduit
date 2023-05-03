import { FC, useState, ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "../container";
import { MdLightMode, MdDarkMode, MdSettings } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { useAppSelector } from "../../hooks/redux";
import { UserAvatar } from "./user-avatar";
import { useGetCurrUserQuery } from "../../api/auth";

interface INavItems {
  title: string | ReactElement[];
  link: string;
  key?: string;
}

const navItems: INavItems[] = [
  { title: "Home", link: "/" },
  { title: "Sign in", link: "/login"},
  { title: "Sign up", link: "/register"},
];

export const Header: FC = () => {
  const isLoggedIn = useAuth();
  const { user } = useAppSelector((state) => state.user);
  const [theme, setTheme] = useState("light");

  const {data = null} = !user && isLoggedIn ? useGetCurrUserQuery() : {}

  const authNavItems: INavItems[] = [
    { title: "Home", link: "/", key: "home" },
    {
      title: [
        <div key='editor' className="flex items-center gap-1">
          <FiEdit />
          New Article
        </div>,
      ],
      link: "/editor",
      key: "editor",
    },
    {
      title: [
        <div key='settings' className="flex items-center gap-1">
          <MdSettings />
          Settings
        </div>,
      ],
      link: "/settings",
      key: "settings",
    },
    {
      title: [
        <UserAvatar
          key='ptofile'
          image={user?.image || data?.user.image || ''}
          username={user?.username || data?.user.username || ''}
        />,
      ],
      link: `/@${user?.username || data?.user.username}`,
      key: "profile",
    },
  ];

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
      <nav className="px-4 py-2">
        <Container>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="mr-8 pb-2 text-2xl font-titillium text-lightGreen"
            >
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
              {isLoggedIn ? (
                <ul className="flex gap-4">
                  {authNavItems.map(({ title, link, key }) => (
                    <li key={key}>
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
              ) : (
                <ul className="flex gap-4">
                  {navItems.map(({ title, link }) => (
                    <li key={title.toString()}>
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
              )}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};
