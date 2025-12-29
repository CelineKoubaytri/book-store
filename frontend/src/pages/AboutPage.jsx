import { Container, Row, Col } from 'react-bootstrap'

export default function AboutPage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="display-4 fw-bold mb-4 text-center">About BookHaven</h1>
          
          <div className="mb-5">
            <h3 className="fw-bold mb-3">Our Story</h3>
            <p className="lead">
              BookHaven is your one-stop destination for discovering and purchasing amazing books 
              from all genres. We believe in the power of reading to transform lives and expand horizons.
            </p>
          </div>

          <div className="mb-5">
            <h3 className="fw-bold mb-3">Our Mission</h3>
            <p>
              Our mission is to make quality literature accessible to everyone. We carefully curate 
              our collection to ensure that every book we offer meets our high standards for both 
              content and quality.
            </p>
          </div>

          <div className="mb-5">
            <h3 className="fw-bold mb-3">Why Choose Us?</h3>
            <Row className="g-4">
              <Col md={6}>
                <h5 className="fw-bold">📚 Curated Selection</h5>
                <p>Every book is handpicked by our team of literary enthusiasts.</p>
              </Col>
              <Col md={6}>
                <h5 className="fw-bold">✨ Quality Assurance</h5>
                <p>We guarantee the authenticity and condition of all our books.</p>
              </Col>
              <Col md={6}>
                <h5 className="fw-bold">🚚 Fast Shipping</h5>
                <p>Quick and secure delivery to your doorstep.</p>
              </Col>
              <Col md={6}>
                <h5 className="fw-bold">💬 Customer Support</h5>
                <p>Our team is always here to help with any questions.</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
