import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RegisterForm from './Register/RegisterForm'; 
import LoginForm from './Login/LoginForm'; 
import Home from './Home/Home'; 
import Welcome from './Welcome'

const NavBar = () => {
  const navigate = useNavigate();

  // Verificar si user es logged in 
  const loggedIn = !!localStorage.getItem('apikey'); //si estas logueado devuelve true

  const handleLogout = () => {
    localStorage.removeItem('apikey');
    localStorage.removeItem('id');
    navigate('/login');  // Redirige al login después de hacer logout
  };

  return (
    <div>
      {/* Navbar con bootstrap */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          {/* Nombre de la app */}
          <Navbar.Brand href="/">TuActividAPP</Navbar.Brand>

          {/* El link es como el <HREF de html, osea el link que esta detras cuando hago click */}
          <Nav className="me-auto">

            {/* Esto muestro si estoy deslogueado*/}
            {!loggedIn ? (
              <>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            ) : (           

             <>{/* Esto muestro si estoy logueado*/}
              <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
              <Nav.Link as="button" onClick={handleLogout} style={{ color: 'white' }}>Logout</Nav.Link>
                </>
            
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Las rutas definen el componente que se renderiza */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default NavBar;


