import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import ProductoraDetail from '../ProductoraDetail';

const ProductoraList = ({ onAdd, refresh }) => {
  const [productoras, setProductoras] = useState([]);
  const [productoraSeleccionada, setProductoraSeleccionada] = useState(null);

  useEffect(() => {
    fetchProductoras();
  }, [refresh]);

  const fetchProductoras = async () => {
    try {
      const response = await api.get('/api/productoras');
      setProductoras(response.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las productoras', 'error');
    }
  };

  // Si hay productora seleccionada, mostrar detalle
  if (productoraSeleccionada) {
    return (
      <ProductoraDetail 
        productora={productoraSeleccionada} 
        onBack={() => setProductoraSeleccionada(null)}
      />
    );
  }

  return (
    <div className="container">
      <h2>Productoras</h2>
      <button className="btn btn-primary btn-lg" onClick={onAdd}>Agregar Productora</button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map((productora) => (
            <tr key={productora._id} onClick={() => setProductoraSeleccionada(productora)} style={{ cursor: 'pointer' }} className="table-hover">
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-warning btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoraList;