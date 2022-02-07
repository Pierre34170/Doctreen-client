import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User_Interface } from "../../interfaces/User.interface";
import { self } from "../../services/user.service";

export const NavBar: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useState<User_Interface>();

  useEffect(() => {
    const currentUserId = localStorage.getItem("user");
    if (!!currentUserId) {
      self().then((loggedUser) => {
        setCurrentUser(loggedUser);
      });
    }
  }, []);
  return (
    <Navbar collapseOnSelect bg="primary" variant="dark">
      <Container>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href={"/home"}>
              accueil
            </Nav.Link>
            {!!currentUser ? (
              <>
                <Nav.Link href={"/profile"}>
                  mon profil
                </Nav.Link>
                <Nav.Link href={"/users"}>
                  utilisateurs
                </Nav.Link>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse >
        </Navbar.Collapse>
        <Navbar.Collapse >
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            {!!currentUser ? (
              <Nav.Link
                href={"/home"}
                onClick={() => {
                  localStorage.removeItem("user");
                }}
              >
                Se déconnecter
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href={"/login"}>
                  S'authentifier
                </Nav.Link>
                <Nav.Link href={"/signup"}>
                  Se créer un compte
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
