import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Customers", link: "/customers" },
  { title: "Products", link: "/products" },
  { title: "Stores", link: "/stores" },
  { title: "DiscountCodes", link: "/DiscountCodes" },
  { title: "Sales", link: "/sales" },
  { title: "SalesProducts", link: "/salesproducts" },
  { title: "StoresProducts", link: "/storesproducts" },
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
