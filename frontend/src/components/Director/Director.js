import React, { useState } from 'react';
import DirectorList from './DirectorList';
import DirectorForm from './DirectorForm';

const Director = () => {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setShowForm(false);
    setRefresh(!refresh);
  };

  return (
    <div className="fade-in">
      <DirectorList onAdd={() => setShowForm(true)} refresh={refresh} />
      <div className={`modal ${showForm ? 'show' : ''}`} style={{ display: showForm ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Director</h5>
              <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
            </div>
            <div className="modal-body">
              <DirectorForm onSave={handleSave} />
            </div>
          </div>
        </div>
      </div>
      {showForm && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default Director;