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
        <Button variant="btn btn-info" onClick={handleShow}>
          Graph
        </Button>

        <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg" show={show} onHide={handleClose}>
          <Modal.Header style={{backgroundColor: "#252526"}} closeButton>
            <Modal.Title style={{color: "green"}} id="example-modal-sizes-title-lg">Graph</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor: "#252526"}}><Graph data={props.data}/></Modal.Body>
          <Modal.Footer style={{backgroundColor: "#252526"}}>
            <Button variant="btn btn-outline-info" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default GraphModal;