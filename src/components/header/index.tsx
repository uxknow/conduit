import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

interface INavItems {
  title: string,
  link: string
}

const navItems: INavItems[] = [
  { title: "Home", link: "/" },
  { title: "Sign in", link: "/login" },
  { title: "Sign up", link: "/register" },
];

export const Header: FC = () => {
  return (
    <header>
      <nav className="px-2 py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="mr-8 text-2xl font-titillium text-green">
            conduit
          </Link>
          <ul className="flex gap-4">
            {navItems.map(({ title, link }) => (
              <li key={title}>
                <NavLink
                  to={link}
                  className={({isActive}) =>
                    `py-navItem ${isActive ? "text-black/80" : "text-black/40"}`
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
