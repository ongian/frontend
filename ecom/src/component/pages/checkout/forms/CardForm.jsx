import React from 'react'
import { Row, Col } from 'react-bootstrap';
const CardForm = () => {
  return (
    <form>
        <Row>
            <Col className="form-group" sm={12}>
                <label>
                    Card number
                </label>
                <input type="text" value="" className="form-control" />
            </Col>
            <Col className="form-group" sm={12}>
                <label>
                    Name on card
                </label>
                <input type="text" value="" className="form-control" />
            </Col>
        </Row>
        <Row>
            <Col className="form-group" sm={12} md={6}>
                <label>
                    Expiration date:
                </label>
                <input type="text" value="" className="form-control" />
            </Col>
            <Col className="form-group" sm={12} md={6}>
                <label>
                    Security code:
                </label>
                <input type="text" value="" className="form-control" />
            </Col>
        </Row>
    </form>
  )
}


export default CardForm;