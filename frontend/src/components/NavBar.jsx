import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Customers", link: "/customers" },
  { title: "Products", link: "/products" },
  { title: "Stores", link: "/stores" },
  { title: "Discount Codes", link: "/DiscountCodes" },
  { title: "Sales", link: "/sales" },
  { title: "Sales Products", link: "/salesproducts" },
  { title: "Stores Products", link: "/storesproducts" },
];

const NavBar = () => {
  return (
    <div>
      <nav className="navbar">
        <div>
          <p className="logo">PokeMartDB</p>
        </div>
        <div className="navbar-links">
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
