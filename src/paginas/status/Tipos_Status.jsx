import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import './Tipos_Status.css';


const Status = () => {
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

  console.log(Status);

  return (
    <div>
      <div>
        <h1>Status</h1>
        <table id="tablaRegistros">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Status.map((status) => (
              <tr>
                <td>{status.id_status}</td>
                <td>{status.tipo_status}</td>
                <Link
                  to={`/editar_status/${status.id_status}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                ><td><button className="btn_edit">Editar
                </button></td></Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to={`/crear_status/`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <button className="btn_new">
          Crear
        </button></Link>
    </div>
  );
};

export default Status;