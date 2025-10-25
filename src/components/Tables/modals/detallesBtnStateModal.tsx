import { Modal } from "react-bootstrap";

interface detalleBtnProps {
  show: boolean;
  setShow: any;
}

function DetallesBtnStateModal({ show, setShow }: detalleBtnProps) {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del botón</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hola este es el detalle del boton!!! Bienvenido</Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)}>close</button>
          <button>Guardar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetallesBtnStateModal;
