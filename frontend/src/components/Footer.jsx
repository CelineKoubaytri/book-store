import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-3">📚 BookHaven</h5>
            <p className="text-white small">
              Your one-stop destination for discovering and purchasing amazing books. 
              Trusted by book enthusiasts on their next reading adventure.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/books" className="text-white text-decoration-none">Browse Books</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="text-white text-decoration-none">Facebook</a>
              <a href="#" className="text-white text-decoration-none">Twitter</a>
              <a href="#" className="text-white text-decoration-none">Instagram</a>
            </div>
          </Col>
        </Row>
        <hr className="border-secondary my-4" />
        <div className="text-center text-white small">
          <p className="mb-0">&copy; 2025 BookHaven. All rights reserved. CSCI426 Project</p>
        </div>
      </Container>
    </footer>
  )
}
