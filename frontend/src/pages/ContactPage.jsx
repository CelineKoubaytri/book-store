import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="display-4 fw-bold mb-4 text-center">Contact Us</h1>
          
          {submitted && (
            <Alert variant="success">
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}

          <div className="mb-5">
            <h3 className="fw-bold mb-3">Get in Touch</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                />
              </Form.Group>

              <Button type="submit" variant="primary" size="lg">
                Send Message
              </Button>
            </Form>
          </div>

          <div>
            <h3 className="fw-bold mb-3">Frequently Asked Questions</h3>
            
            <div className="mb-4">
              <h5 className="fw-bold">How long does shipping take?</h5>
              <p>Standard shipping typically takes 3-5 business days. Express options are also available.</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold">What is your return policy?</h5>
              <p>We offer a 30-day return policy for all books in their original condition.</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold">Do you ship internationally?</h5>
              <p>Yes! We ship to most countries worldwide. Shipping costs vary by location.</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold">How can I track my order?</h5>
              <p>You'll receive a tracking number via email once your order ships.</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
