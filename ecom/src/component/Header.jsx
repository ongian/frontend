import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import useCategory from "../Auxillary/useCategory";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export const Header = () => {
    const categories = useCategory();
    const cartState = useSelector(state => state.cart.cart);
    const wishlistState = useSelector(state => state.wishlist.wishlist);
    const categoryDropdown = categories && categories.length > 0 ? (
        <NavDropdown title="Category">
            {categories.map((c,i) => (<NavDropdown.Item key={i} href={"/category/" + c}>{c}</NavDropdown.Item>))}
            <NavDropdown.Item href="/category/all-products">
                All products
            </NavDropdown.Item>
        </NavDropdown>
    ) : null;

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="align-items-lg-center">
                        <Link to="/account"><FontAwesomeIcon icon={faUser} /> <span className="d-inline-block d-lg-none">My Account</span></Link>
                        <Link to="/cart"> <FontAwesomeIcon icon={faShoppingCart} /> <span className="d-inline-block d-lg-none">Cart</span><span className="count">{cartState.length}</span></Link>
                        <Link to="/wishlist"> <FontAwesomeIcon icon={faHeart} /> <span className="d-inline-block d-lg-none">Wishlist</span><span className="count">{wishlistState.length}</span></Link>
                        {categoryDropdown}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};
