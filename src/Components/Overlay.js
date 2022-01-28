import React from "react";
import "../CSS/Overlay.css";
import { useContext } from "react";
import { postContext } from "../Context/postContext";

export default function Overlay() {
  const { setConfirm, toDelete, setToDelete, handleDelete } =
    useContext(postContext);

  const handleCancel = () => {
    setConfirm(false);
  };

  const handleDeleteButton = async () => {
    await handleDelete(toDelete);
    setConfirm(false);
    setToDelete("");
  };

  return (
    <>
      <div onClick={handleCancel} className="overlay"></div>
      <div className="confirm-container">
        <h3 className="press-start">¿Seguro que desea borra el tweet?</h3>
        <div className="btn-container">
          <button onClick={handleDeleteButton} className="erase-btn">
            Borrar
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
