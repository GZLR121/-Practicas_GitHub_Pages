import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import './Crear_Info.css';

const Add = () => {
  const [Status, setStatus] = useState([]);
  const [Productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchAllStatus = async () => {
      try {
        const res = await axios.get(`${window.backendHostUrl}/tipos_status`);
        setStatus(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStatus();
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

  console.log(Status);
  console.log(Productos);

  const [producto, setproducto] = useState({
    id_producto: "",
    num_producto: "",
    id_status: "",
  });
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setproducto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const exist = await axios.get(`${window.backendHostUrl}/existe_producto_info/` + producto.id_producto + "/" + producto.num_producto);
      if (exist?.data) {
        alert("El folio " + producto.num_producto + "del producto seleccionado ya existe");
        return;
      }

      await axios.post(`${window.backendHostUrl}/productos_info`, producto);
      navigate("/lista_info");

    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form_new_info">
      <h1>Agregar detalle de producto</h1>
      <div className="campo_new_info">
        <label for="nombre">Nombre del Producto:</label>
        <select className="select_idprod_info" name="id_producto" onChange={handleChange} required>
          <option value='0'>--Seleccionar--
          </option>
          {Productos.map((producto) => (
            <option value={producto.id_producto}>{producto.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="campo_new_info">
        <label for="nombre">Status:</label>
        <select className="select_idstat_info" name="id_status" onChange={handleChange} required>
          <option value='0'>--Seleccionar--</option>
          {Status.map((status) => (
            <option value={status.id_status}>{status.tipo_status}
            </option>
          ))}
        </select>
      </div>

      <div className="campo_new_info">
        <label for="num_producto">Folio:</label>
        <input className="input_numprod_info" type="text" id="num_producto" name="num_producto" onChange={handleChange} required />
      </div>
      <button className="btn_guardar_info" onClick={handleInsert}>Guardar</button>
      {error && "Something went wrong!"}
      <br />
      <Link to="/lista_info">Ver todos los productos detalles</Link>
    </div>
  );
};

export default Add;