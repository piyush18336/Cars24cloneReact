import React from 'react'
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Toast = () => {

  const [show, setShow] = useState(false);

  return (
       <Row className='container'>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} position="top-center" autohide>
          <Toast.Header>
            <strong className="me-auto">Message</strong>
            <small>0 mins ago</small>
          </Toast.Header>
          <Toast.Body>Data Updated Successfully !!!!</Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
        {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
      </Col>
    </Row>
  )
}

export default Toast
