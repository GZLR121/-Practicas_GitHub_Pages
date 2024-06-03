import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    debugger;
    console.log(String(window.backendHostUrl));
    const fetchAllProductos = async () => {
      try {
        const res = await axios.get(`${window.backendHostUrl}/productos`);
        
        setProductos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProductos();
  }, []);

  console.log(productos);

  const [filtro, setFiltro] = useState({
    nombre: "",
    descripcion_cantidad: "",
    codigo_barras: ""
  });

  const [error] = useState(false)

  //const navigate = useNavigate();

  const handleChange = (e) => {
    setFiltro((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let url = `${window.backendHostUrl}/productos_filtro/`;

      if (filtro.nombre)
        url += "'" + filtro.nombre + "/";
      else
        url += "''/";

      if (filtro.descripcion_cantidad)
        url += "'" + filtro.descripcion_cantidad + "/";
      else
        url += "''/";

      if (filtro.codigo_barras)
        url += "'" + filtro.codigo_barras + "";
      else
        url += "''";

      console.log(url);
      const res = await axios.get(url);
      setProductos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Div_Lista">
      <h1>Lista de productos</h1>
      {/* <div className="contenedor-filtro">
        <label>Filtrar por:</label>
        <select id="filtro" name="filtro">
          <option value="">Todos</option>
          <option value="nombre">Nombre</option>
          <option value="status">Status</option>
          <option value="folio">Folio</option>
          <option value="codigo">Código</option>
          <option value="cantidad">Cantidad</option>
        </select>
        <input type="text" id="valorFiltro" placeholder="Ingrese valor de búsqueda" />
        <button className="button_buscar" type="submit">Buscar</button>
      </div>
      <br /> */}
      <div class="tableFixHead_Prod">
        <table id="tablaRegistros">
          <thead>
            <tr>
              <th>
                <div class="input-con-label">
                  <label for="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
                </div>
              </th>
              <th><div class="input-con-label">
                <label for="descripcion_cantidad">Cantidad:</label>
                <input type="text" id="descripcion_cantidad" name="descripcion_cantidad" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
              </div></th>
              <th><div class="input-con-label">
                <label for="codigo_barras">Codigo de Barras:</label>
                <input type="text" id="codigo_barras" name="codigo_barras" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
              </div></th>
              <th><div class="boton_buscar">
                <button className="btn_search" onClick={handleSearch}>Buscar</button>
                {error && "El valor de busqueda es invalido"}
              </div></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion_cantidad}</td>
                <td>{producto.codigo_barras}</td>

                <Link
                  to={`/actualizar/${producto.id_producto}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                ><td><button className="btn_edit">Editar
                </button></td></Link>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">
                <Link
                  to={`/crear/`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="btn_new">
                    Crear
                  </button></Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>


    </div>
  );
};

export default Productos;