import { Modal } from "react-bootstrap";

const TransactionLoader = (props) => {

  return (
    <Modal
      size="lg"
      backdrop="static"
      className="loader-modal"
      show={props.show}
    >
      <Modal.Header>
        <Modal.Title>
          <h2>Please wait!</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-5">
          <h3>Please confirm the transaction and wait for a moment.</h3>
          <div>
            <img
              className="loader"
              src="/img/loader2.gif"
              alt="#"
              style={{ width: "30%" }}
            />{" "}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default TransactionLoader;
