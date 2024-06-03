import React from "react";
import { Link } from "react-router-dom";
//import './Lista_Info.css';
//import { useNavigate } from "react-router-dom";

const Menu_Botones = () => {
    return (
        <div className="Menu">
            <h1>Menú Principal</h1>
            <div class="botones_menu">
                <Link to={`/enviar_a_almacen/`} style={{ color: "inherit", textDecoration: "none" }}>
                    <button className="addHome"><span></span><span></span>Enviar a "Almacen"</button></Link>
                <Link to={`/enviar_a_transito/`} style={{ color: "inherit", textDecoration: "none" }}>
                    <button className="addHome"><span></span><span></span>Enviar a "En Transito"</button></Link>
                <Link to={`/enviar_a_vendido/`} style={{ color: "inherit", textDecoration: "none" }}>
                    <button className="addHome"><span></span><span></span>Enviar a "Vendido"</button></Link>
            </div>
        </div>
    );
};

export default Menu_Botones;