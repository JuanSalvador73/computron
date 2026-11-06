import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CardWidget from '../CardWidget';
import logo from '../../assets/img/Frame-Logo.png';
import { NavLink } from 'react-router';
import styles from './Nav.module.css'


const NavbarBS = () => {
  return (
    <Navbar expand="lg" className=" bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand>
            <NavLink to='/'>
              <img src={logo} alt='logo' className={styles.navlogo}/>
            </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink}to='/' className='navlinks'>Home</Nav.Link>
            <Nav.Link as={NavLink}to='/enterprise'>Empresa</Nav.Link>
            
            <NavDropdown title="Computadoras" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink}to='/categories/desktop'>Desktop</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink}to='/categories/labtop'>
                Labtop
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink}to='/categories/workstation'>Workstation</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink}to='/categories/monitor'>
                Monitores
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink}to='/contact'>Contacto</Nav.Link>
          </Nav>
          <Nav.Link as={NavLink} to='/cart'>
            <CardWidget />
          </Nav.Link>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBS;