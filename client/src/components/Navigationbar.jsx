import React from "react";
import { useNavigate } from 'react-router-dom';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function Navigationbar() {

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/signup');
  }

  const handleClickLogin = (e) => {
    e.preventDefault()
    navigate('/login');
  }

  const handleClickHome = (e) => {
    e.preventDefault()
    navigate('/');
  }

  return (
    <Navbar>
      <NavbarBrand>
        <h1 className="font-bold text-inherit">Food Forager Pro Max</h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem  className="hidden lg:flex">
          <Link href="">Login</Link>
        </NavbarItem>
        
        <NavbarItem>
          <Button as={Link} color="primary" href="" variant="flat" onClick={handleClickHome}>
            Home
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="" variant="flat" onClick={handleClick}>
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="" variant="flat" onClick={handleClickLogin}>
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
