import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UpdateButton from './UpdateButton';

function ModalUpdate({m,setTodo,fetch}) {
  const [show, setShow] = useState(false);
  const [updateValue,setUpdateValue] = useState(m.name)
  const [id] = useState(m.id)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updating = async () =>{
    const response = await axios.put(`http://localhost:3001/todos/${id}`,{
      name: updateValue
    })

    setTodo(response)
    fetch()

    handleClose();
  }

  return (
    <>
        
      
     <UpdateButton onClickHandler={handleShow}/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Update Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="update value"
                autoFocus
                onChange = {(e)=>{
                  setUpdateValue(e.target.value)
                }}
                value={updateValue}
              />
            </Form.Group>
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updating}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Example />);

export default ModalUpdate;