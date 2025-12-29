import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Hero() {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="align-items-center min-vh-50">
          <Col lg={6} className="text-center text-lg-start">
            <h1 className="display-4 fw-bold mb-3">
              Welcome to BookHaven
            </h1>
            <p className="lead text-muted mb-4">
              Discover your next favorite book from our curated collection. 
              Quality reads for every taste and occasion.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
              <Button variant="primary" size="lg">
                Browse Books
              </Button>
              <Button variant="outline-secondary" size="lg">
                Learn More
              </Button>
            </div>
          </Col>
          <Col lg={6} className="text-center mt-4 mt-lg-0">
            <img 
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop" 
              alt="Stack of books" 
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
