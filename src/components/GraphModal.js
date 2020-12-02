import React, { Component, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Graph from "./Graph";

function GraphModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Graph
        </Button>

        <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg" show={show} onHide={handleClose}>
          <Modal.Header style={{backgroundColor: "#000"}} closeButton>
            <Modal.Title style={{color: "green"}} id="example-modal-sizes-title-lg">Graph</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor: "#000"}}><Graph data={props.data}/></Modal.Body>
          <Modal.Footer style={{backgroundColor: "#000"}}>
            <Button variant="success" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default GraphModal;