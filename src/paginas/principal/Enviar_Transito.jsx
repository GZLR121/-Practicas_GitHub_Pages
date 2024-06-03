import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
//import './Lista_Info.css';
import { useNavigate } from "react-router-dom";

const Producto = () => {

    const [Folio, setFolio] = useState([]);
    useEffect(() => {
        const fetchAllFolios = async () => {
            try {
                const res = await axios.get(`${window.backendHostUrl}/obtener_folios/`);
                setFolio(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllFolios();
    }, []);

    const [producto, setProducto] = useState([]);

    const [busqueda_codigo, setBusqueda] = useState({
        codigo_barras: ""
    });

    // const [errorBusqueda, setErrorBusqueda] = useState(false);
    const [errorGuardar, setErrorGuardar] = useState(false);


    const navigate = useNavigate();
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            let encontrado = handleSearch(e);
            if (!encontrado)
                return;
            e.target.value = '';
            handleChange(e);
        }
    }

    const handleChange = (e) => {
        setBusqueda((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // const handleSelectFolio = (e) => {
    //     debugger;
    //     setProducto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!busqueda_codigo || !busqueda_codigo.codigo_barras) {
            alert('Captura texto busqueda!');
            // setErrorBusqueda(true);
            return false;
        }

        try {
            let url = `${window.backendHostUrl}/obtener_producto/${busqueda_codigo.codigo_barras}`;

            console.log(url);
            const res = await axios.get(url);
            if (!res || !res.data) {
                alert('El Codigo de Barras Insertado No Existe');
                // setErrorBusqueda(true);
                return false;
            }

            if (!Folio.some(a => a.id_producto === res.data.id_producto && a.id_status !== 2)) {
                alert('No hay ningun folio de este producto disponible para enviar a Transito');
                // setErrorBusqueda(true);
                return false;
            }
            console.log("data:", res.data);
            let prods = [];
            if (producto.length > 0) {
                producto.forEach(element => {
                    prods.push(element);
                });
            }
            prods.push(res.data);
            setProducto(prods);
            // setErrorBusqueda(false);
            return true;
        } catch (err) {
            console.log(err);
            // setErrorBusqueda(true);
            return false;
        }
    };

    // const navigate = useNavigate();

    // const handleUpdate = async (e) => {
    //     e.preventDefault();
    //     try {
    //       // Enviar datos a MySQL usando un bucle foreach
    //       for (const producto of producto) {
    //         const datos = {
    //           // Suponiendo que tiene estos campos en su tabla de base de datos
    //           nombre: producto.nombre,
    //           descripcion_cantidad: producto.descripcion_cantidad,
    //           codigo_barras: producto.codigo_barras,
    //           num_producto: producto.Folio.num_producto, // Suponiendo que Folio tiene el num_producto seleccionado
    //         };
    //         await axios.post(`${window.backendHostUrl}/su_punto_final_para_insertar, datos);
    //       }
    //       navigate("/enviar_a_almacen");
    //     } catch (err) {
    //       console.log(err);
    //       setError(true);
    //     }
    //   };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (producto.length > 0) {
                let resConfirm = window.confirm("¿Desea enviar estos folios a Transito?");
                if (resConfirm) {
                    producto.forEach(async element => {
                        if (element.num_producto) {
                            let query = `${window.backendHostUrl}/producto_envio_transito/${element.id_producto}/${element.num_producto}`;
                            console.log("Query to update:", query);
                            await axios.put(query, element);

                        }

                    });
                    window.alert('Folios enviado a Transito Exitosamente');
                    navigate("/");
                }
            }
        } catch (err) {
            console.log(err);
            setErrorGuardar(true);
        }
    };

    function funcSetFolio(inx, val) {
        let prods = [];
        let index = -1;
        if (producto.length > 0) {
            producto.forEach(element => {
                index++;
                if (index === inx)
                    element.num_producto = val.currentTarget.value;
                prods.push(element);
            });
        }
        setProducto(prods);
    }

    function funcDelete(inx) {
        let prods = [];
        let index = -1;
        if (producto.length > 0) {
            producto.forEach(element => {
                index++;
                if (index !== inx)
                    prods.push(element);
            });
        }
        setProducto(prods);
    }

    return (
        <div className="Div_Enviar">
            <h1>Enviar Folios a Transito</h1>
            <div class="Busqueda_producto">
                <input className="input_buscar_codigo" type="number" id="codigo_barras"
                    name="codigo_barras" placeholder="Ingrese codigo de barras"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
                <div class="boton_buscar_codigo" >
                    <button className="btn_search" id="btnBuscar" onClick={handleSearch}>Buscar</button>
                    {/* {errorBusqueda && "El valor de busqueda es invalido"} */}
                </div>
            </div>

            <br />

            <div class="tableFixHead">
                <table id="tablaRegistros">
                    <thead>
                        <tr>
                            <th>
                                <div class="label">
                                    <label for="nombre">Nombre:</label>
                                </div>
                            </th>
                            <th>
                                <div class="input-con-label">
                                    <label for="descripcion_cantidad">Cantidad:</label>
                                </div>
                            </th>
                            <th>
                                <div class="label">
                                    <label for="codigo_barras">Codigo de Barras:</label>
                                </div>
                            </th>
                            <th>
                                <div class="label">
                                    <label for="num_producto">Folio:</label>
                                </div>
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            producto.map((prod, index) => (
                                <tr>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.descripcion_cantidad}</td>
                                    <td>{prod.codigo_barras}</td>
                                    <td>
                                        <select name="num_producto" required onChange={(option) => funcSetFolio(index, option)}>
                                            <option value='0'>--Seleccionar--</option>
                                            {Folio.map((folio) => {
                                                if (folio.id_producto === prod.id_producto && folio.id_status !== 2)
                                                    return <option value={folio.num_producto}>{folio.mytitle}</option>
                                                return null
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <div class="boton_eliminar_index" >
                                            <button className="btn_delete" id="btnEliminarIndex" onClick={() => funcDelete(index)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5">
                                <button className="btn_new" onClick={handleUpdate}>Enviar a "Transito"</button>
                                {errorGuardar && "Something went wrong!"}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Producto;