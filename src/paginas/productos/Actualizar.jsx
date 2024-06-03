import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
//import './Actualizar.css';

const Update = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion_cantidad: "",
    codigo_barras: ""
  });
  // const [producto, setProducto] = useState([]);
  const [error, setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const productoId = location.pathname.split("/")[2];

  useEffect(() => {
    const getProducto = async () => {
      try {
        const res = await axios.get(`${window.backendHostUrl}/producto/${productoId}`);
        setProducto(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducto();
  }, [productoId]);

  console.log(producto);

  const handleChange = (e) => {
    setProducto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (producto.nombre === "" || producto.descripcion_cantidad === "" || producto.codigo_barras === "" ){
        alert("No deje ningun campo sin llenar");
        return;
      }
      // const exist = await axios.get(`${window.backendHostUrl}/existe_producto_cod/`+ producto.codigo_barras);
      // if (exist?.data) {
      //   alert("El codigo de barras " + producto.codigo_barras + " ya existe o fue eliminado anteriormente");
      //   return;
      // }
      await axios.put(`${window.backendHostUrl}/productos/${productoId}`, producto);
      alert('El producto se ha actualizado correctamente');
      navigate("/productos");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("¿Desea eliminar este producto?"))
{
      await axios.delete(`${window.backendHostUrl}/productos/${id}`);
      alert('El producto se ha eliminado correctamente');
      navigate("/productos");
     }     // window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Editar Producto</h1>
      <div className="campo">
        <label for="nombre">Nombre del Producto:</label>
        <input type="text" name="nombre" id="nombre" value={producto.nombre} onChange={handleChange} required />
        <br />
        <label for="descripcion_cantidad">Cantidad:</label>
        <input type="text" name="descripcion_cantidad" id="descripcion_cantidad" value={producto.descripcion_cantidad} onChange={handleChange} required />
        <br />
        <label for="codigo_barras">Código de Barras:</label>
        <input type="text" name="codigo_barras" id="codigo_barras" value={producto.codigo_barras} onChange={handleChange} required />
      </div>

      <button className="btn_update" onClick={handleUpdate}>Actualizar</button>
      <button className="btn_delete" onClick={() => handleDelete(productoId)}>Eliminar</button>
      {error && "Something went wrong!"}
      <br />
      <br />
      <Link to="/productos">Ver todos los productos</Link>

    </div>
  );
};

export default Update;