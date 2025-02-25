import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Importar el Provider de Redux
import store from './redux/store'; // Importar el store de Redux
import NavBar from './Components/NavBar';
import './App.css';
import { ToastContainer } from 'react-toastify'; // Importar toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos de Toastify

function App() {
  return (
    <Provider store={store}> {/* Envolvemos la aplicación con el Provider */}
      <Router> {/* Router envuelve la navegación de la app */}
        <NavBar /> {/* Aquí se maneja la navegación */}

        {/* Este es el contenedor global para mostrar los toasts */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
      </Router>
    </Provider>
  );
}

export default App;
