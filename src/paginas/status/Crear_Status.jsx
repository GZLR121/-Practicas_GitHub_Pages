import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import './Crear_Status.css';

const Add = () => {
  const [status, setstatus] = useState({    
    tipo_status: "",
    habilitado: 1
  });
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setstatus((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${window.backendHostUrl}/tipos_status`, status);
      navigate("/tipos_status");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Agregar nuevo status</h1>
      <div className="campo">
        <label for="tipo_status">Nombre del status:</label>
        <input type="text" id="tipo_status" name="tipo_status" onChange={handleChange} required />
      </div>

      <button className="btn_save" onClick={handleInsert}>Guardar</button>
      {error && "Something went wrong!"}
      <br />
      <br />
      <Link to="/tipos_status">Ver todos los status</Link>
    </div>
  );
};

export default Add;