import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import './Lista_Info.css';
//import { useNavigate } from "react-router-dom";

const Productos_Info = () => {
  const [productos_info, setProductos_Info] = useState([]);

  useEffect(() => {
    const fetchAllProductos_Info = async () => {
      try {
        debugger;
        const res = await axios.get(`${window.backendHostUrl}/productos_info`);
        setProductos_Info(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProductos_Info();
  }, []);

  console.log(productos_info);

  const [filtro, setproducto] = useState({
    nombre: "",
    tipo_status: "",
    num_producto: "",
    codigo_barras: "",
    descripcion_cantidad: ""
  });

  const [error] = useState(false)

  //const navigate = useNavigate();

  const handleChange = (e) => {
    setproducto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    debugger;
    try {
      let url = `${window.backendHostUrl}/productos_info_filtro/`;

      if (filtro.nombre)
        url += "'" + filtro.nombre + "/";
      else
        url += "''/";

      if (filtro.tipo_status)
        url += "'" + filtro.tipo_status + "/";
      else
        url += "''/";

      if (filtro.num_producto)
        url += "'" + filtro.num_producto + "/";
      else
        url += "''/";

      if (filtro.codigo_barras)
        url += "'" + filtro.codigo_barras + "/";
      else
        url += "''/";

      if (filtro.descripcion_cantidad)
        url += "'" + filtro.descripcion_cantidad + "";
      else
        url += "''";

      console.log(url);
      const res = await axios.get(url);
      setProductos_Info(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Div_Lista_Info">
      <h1>Productos Detalles</h1>
      {/* <div className="contenedor-filtro">
        <label>Filtrar por:</label>
        <select id="filtro" name="filtro" onChange={handleChange}>
          <option value="">Todos</option>
          <option value="producto.nombre">Nombre</option>
          <option value="estado.tipo_status">Status</option>
          <option value="producto_data.num_producto">Folio</option>
          <option value="producto.codigo_barras">Código</option>
          <option value="producto.descripcion_cantidad">Cantidad</option>
        </select>
        <input type="text" id="valorFiltro" name="valorFiltro" placeholder="Ingrese valor de búsqueda" onChange={handleChange} required />
        <button onClick={handleSearch}>Buscar</button>
        {error && "El valor de busqueda es invalido"}
      </div>
      <br /> */}
      <div class="tableFixHead_Info">
        <table id="tablaRegistros">
          <thead>
            <tr>
              <th>
                <div class="input-con-label">
                  <label for="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
                </div>
              </th>
              <th>
                <div class="input-con-label">
                  <label for="tipo_status">Status:</label>
                  <input type="text" id="tipo_status" name="tipo_status" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
                </div>
              </th>
              <th>
                <div class="input-con-label">
                  <label for="num_producto">Folio:</label>
                  <input type="text" id="num_producto" name="num_producto" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
                </div>
              </th>
              <th>
                <div class="input-con-label">
                  <label for="codigo_barras">Codigo de Barras:</label>
                  <input type="text" id="codigo_barras" name="codigo_barras" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
                </div>
              </th>
              <th>
                <div class="input-con-label">
                  <label for="descripcion_cantidad">Cantidad:</label>
                  <input type="text" id="descripcion_cantidad" name="descripcion_cantidad" placeholder="Ingrese valor de búsqueda" onChange={handleChange} />
                </div>
              </th>
              <th>
                <div class="boton_buscar">
                  <button className="btn_search" onClick={handleSearch}>Buscar</button>
                  {error && "El valor de busqueda es invalido"}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {productos_info.map((producto) => (
              <tr>
                <td>{producto.nombre}</td>
                <td>{producto.tipo_status}</td>
                <td>{producto.num_producto}</td>
                <td>{producto.codigo_barras}</td>
                <td>{producto.descripcion_cantidad}</td>

                <Link
                  to={`/actualizar_info/${producto.id_producto_data}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                ><td><button className="btn_edit">Editar
                </button></td></Link>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6">
                <Link
                  to={`/crear_info/`}
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

export default Productos_Info;