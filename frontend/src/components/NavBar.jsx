import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Customers", link: "/customers" },
  { title: "Products", link: "/products" },
  { title: "Stores", link: "/stores" },
  { title: "Discount Codes", link: "/discountcodes" },
  { title: "Sales", link: "/sales" },
  { title: "Sales Products", link: "/salesproducts" },
  { title: "Stores Products", link: "/storesproducts" },
];

const NavBar = () => {
  return (
    <div>
      <nav>
        <div>
          <h2 className="logo">PokeMartDB</h2>
        </div>
        <div>
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.link} className="nav-item">
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
