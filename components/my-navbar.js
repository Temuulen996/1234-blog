import { Navbar, Nav } from "react-bootstrap";
import { useTheme } from "hooks/use-theme";
import Link from "next/link";

export default () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Navbar className="fj-navbar fj-nav-base" bg="transparent" expand="lg">
      <Navbar.Brand className="fj-navbar-brand">
        <Link href="/">
          <a onClick={toggleTheme} style={{ color: theme.fontColor }}>
            1234 БЛОГ
          </a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="fj-navbar-item fj-navbar-link" href="/">
            НҮҮР
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
