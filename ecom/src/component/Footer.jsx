import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import useCategory from '../Auxillary/useCategory';
import { Link } from 'react-router-dom';
const Footer = () => {
    const category = useCategory();
    const categoryLinks = category ? category.map((cat) => <Link key={cat} to={'/category/' + cat}>{cat}</Link>) : null
    return (
        <footer>
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={4}>
                        <Link to={'/'}>
                            <h1>Home</h1>
                        </Link>
                    </Col>
                    <Col xs={12} md={8} className="text-md-end">
                        {categoryLinks}
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;