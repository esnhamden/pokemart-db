import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Customers", link: "/customers" },
];

const NavBar = () => {
  return (
    <div>
      <nav>
        <div>
          <p>PokeMartDB</p>
        </div>
        <div>
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.link}>
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
