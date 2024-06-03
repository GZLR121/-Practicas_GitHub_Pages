import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
//import './Actualizar_Info.css';

const Update_Info = () => {

  const [Status, setStatus] = useState([]);
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
  }, []);

  console.log('Status', Status);
  const [producto_info, setproducto_info] = useState({
    nombre_producto: "",
    id_status: "",
    num_producto: ""
  });
  // const [producto_info, setproducto_info] = useState([]);
  const [error, setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const producto_infoId = location.pathname.split("/")[2];

  useEffect(() => {
    const getproducto_info = async () => {
      try {
        const res = await axios.get(`${window.backendHostUrl}/productos_info/${producto_infoId}`);
        setproducto_info(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getproducto_info();
  }, [producto_infoId]);

  console.log(producto_info);

  const handleChange = (e) => {
    setproducto_info((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${window.backendHostUrl}/productos_info/${producto_infoId}`, producto_info);
      alert('El producto_info se ha actualizado correctamente');
      navigate("/lista_info");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const SelectEstatus = ({ options }) => (
    <select onChange={handleChange} defaultValue={producto_info.id_status} className="select_idstat_info" name="id_status" required>
      <option key="-1" value="null">
        --Seleccionar--
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.id_status} selected={option.id_status === producto_info.id_status} >
          {option.tipo_status}
        </option>
      ))}
    </select>
  );

  return (
    <div className="form_new_info">
      <h1>Editar producto_info</h1>
      <div className="campo">
        <label for="nombre_producto">Nombre del producto:</label>
        <input className="input_nomprod_info" type="text" name="nombre_producto" id="nombre_producto" readOnly value={producto_info.nombre} onChange={handleChange} required />
        <br />
        <label for="id_status">Status:</label>
        <SelectEstatus name="id_status" options={Status} />
        {/* <select onChange={handleChange} defaultValue={producto_info.id_status} required>
          <option value='0'>--Seleccionar--</option>
          {Status.map((status) => (
            <option name="id_status" value={status.id_status}>{status.tipo_status}
            </option>
          ))}
        </select> */}
        <br />
        <label for="num_producto">Folio:</label>
        <input className="input_numprod_info" type="text" name="num_producto" id="num_producto" value={producto_info.num_producto} onChange={handleChange} required />
      </div>

      <button className="btn_update_info" onClick={handleUpdate}>Actualizar</button>
      {error && "Something went wrong!"}
      <br />
      <Link to="/lista_info">Ver todos los productos detalles</Link>
    </div>
  );
};

export default Update_Info;