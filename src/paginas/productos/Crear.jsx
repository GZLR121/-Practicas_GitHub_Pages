import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Crear.css';

const Add = () => {
  const [producto, setproducto] = useState({
    nombre: "",
    descripcion_cantidad: "",
    codigo_barras: "",
    habilitado: 1
  });
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setproducto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      debugger;
      if (producto.nombre === "" || producto.descripcion_cantidad === "" || producto.codigo_barras === "" ){
        alert("No deje ningun campo sin llenar");
        return;
      }
      const exist = await axios.get(`${window.backendHostUrl}/existe_producto_cod/`+ producto.codigo_barras);
      if (exist?.data) {
        alert("El codigo de barras " + producto.codigo_barras + " ya existe o fue eliminado anteriormente");
        return;
      }
      await axios.post(`${window.backendHostUrl}/productos`, producto);
      navigate("/productos");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form_new">
      <h1>Agregar nuevo producto</h1>
      <div className="campo_new">
        <label for="nombre">Nombre del Producto:</label>
        <input type="text" id="nombre" name="nombre" onChange={handleChange} required />
      </div>

      <div className="campo_new">
        <label for="descripcion_cantidad">Cantidad:</label>
        <input type="text" id="descripcion_cantidad" name="descripcion_cantidad" onChange={handleChange} required />
      </div>

      <div className="campo_new">
        <label for="codigo_barras">Código de Barras:</label>
        <input type="number" id="codigo_barras" name="codigo_barras" onChange={handleChange} required />
      </div>
      <br />
      <button className="btn_save" onClick={handleInsert}>Guardar</button>
      {error && "Something went wrong!"}
      <br />
      <br />
      <Link to="/productos">Ver todos los productos</Link>
    </div>
  );
};

export default Add;