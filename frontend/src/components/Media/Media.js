import React, { useState } from 'react';
import MediaList from './MediaList';
import MediaForm from './MediaForm';

const Media = () => {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setShowForm(false);
    setRefresh(!refresh);
  };

  return (
    <div className="fade-in">
      <MediaList onAdd={() => setShowForm(true)} refresh={refresh} />
      <div className={`modal ${showForm ? 'show' : ''}`} style={{ display: showForm ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Media</h5>
              <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
            </div>
            <div className="modal-body">
              <MediaForm onSave={handleSave} />
            </div>
          </div>
        </div>
      </div>
      {showForm && <div className="modal-backdrop show"></div>}
    </div>
  );
};

export default Media;