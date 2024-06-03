import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
//import './Actualizar_Status.css';

const Update = () => {
  const [Status, setStatus] = useState({
    tipo_status: "",
  });
  // const [Status, setStatus] = useState([]);
  const [error, setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const StatusId = location.pathname.split("/")[2];

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(`${window.backendHostUrl}/tipos_status/${StatusId}`);
        console.debug(res.data);
        setStatus(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getStatus();
  }, [StatusId]);

  console.log(Status);

  const handleChange = (e) => {
    setStatus((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${window.backendHostUrl}/tipos_status/${StatusId}`, Status);
      alert('El Status se ha actualizado correctamente');
      navigate("/tipos_status");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("¿Desea eliminar este Status?"))
{
      await axios.delete(`${window.backendHostUrl}/tipos_status/${id}`);
      alert('El Status se ha eliminado correctamente');
      navigate("/tipos_status");
     }     // window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Editar Status</h1>
      <div className="campo">
        <label for="tipo_status">Nombre del Status:</label>
        <input type="text" name="tipo_status" id="tipo_status" value={Status.tipo_status} onChange={handleChange} required />

      </div>

      <button className="btn_update" onClick={handleUpdate}>Actualizar</button>
      <button className="btn_delete" onClick={() => handleDelete(StatusId)}>Eliminar</button>
      {error && "Something went wrong!"}
      <br />
      <br />
      <Link to="/tipos_status">Ver todos los status</Link>
    </div>
  );
};

export default Update;