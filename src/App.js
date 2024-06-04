import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crear from "./paginas/productos/Crear";
import Lista from "./paginas/productos/Lista";
import Actualizar from "./paginas/productos/Actualizar";
import CrearInfo from "./paginas/productos_info/Crear_Info";
import ListaInfo from "./paginas/productos_info/Lista_Info";
import ActualizarInfo from "./paginas/productos_info/Actualizar_Info";
import Status from "./paginas/status/Tipos_Status";
import EditarStatus from "./paginas/status/Editar_Status";
import CrearStatus from "./paginas/status/Crear_Status";
import Menu from "./paginas/principal/Menu";
import EnviarAlmacen from "./paginas/principal/Enviar_Almacen";
import EnviarTransito from "./paginas/principal/Enviar_Transito";
import EnviarVendido from "./paginas/principal/Enviar_Vendido";


function App() {
  return (
    <div>
      <header>
        <h3 className="logo"><a href="/"><img src="../logo.png" alt='logo'/></a></h3>
        <nav className="navigation">
            <a href={`${window.frontendGitHubPages}/`}>Inicio</a>
            <a href="/lista_info">Productos Detalles</a>
            <a href="/productos">Productos</a>
            <a href="/tipos_status">Tipo de Status</a>
        </nav>
    </header>
      <BrowserRouter>
        <Routes>
          <Route path="/productos" element={<Lista />} />
          <Route path="/crear_info" element={<CrearInfo />} />
          <Route path="/actualizar_info/:id" element={<ActualizarInfo />} />
          <Route path="/lista_info" element={<ListaInfo />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/actualizar/:id" element={<Actualizar />} />
          <Route path="/tipos_status/" element={<Status />} />
          <Route path="/crear_status" element={<CrearStatus />} />
          <Route path="/editar_status/:id" element={<EditarStatus />} />
          <Route path={`${window.frontendGitHubPages}/`} element={<Menu />} />
          <Route path="/enviar_a_almacen" element={<EnviarAlmacen />} />
          <Route path="/enviar_a_transito" element={<EnviarTransito />} />
          <Route path="/enviar_a_vendido" element={<EnviarVendido />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload by GAEL.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
