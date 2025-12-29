import { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { booksAPI } from '../services/api'
import BookCard from '../components/BookCard'

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadFeaturedBooks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const books = await booksAPI.getAll({ featured: 'true' })
      console.log('Featured books loaded:', books)
      setFeaturedBooks(books)
    } catch (err) {
      console.error('Error loading featured books:', err)
      setError(err.message)
      setFeaturedBooks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFeaturedBooks()
  }, [loadFeaturedBooks])

  return (
    <>
      <div className="hero-section text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-3">Welcome to BookHaven</h1>
              <p className="lead mb-4">
                Discover your next favorite book from our curated collection
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button as={Link} to="/books" variant="light" size="lg">
                  Browse Books
                </Button>
                <Button as={Link} to="/about" variant="outline-light" size="lg">
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

      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center g-4">
            <Col md={4}>
              <div className="feature-icon mb-3">📚</div>
              <h5 className="fw-bold">Wide Selection</h5>
              <p className="text-muted">
                Explore thousands of books across various genres and categories
              </p>
            </Col>
            <Col md={4}>
              <div className="feature-icon mb-3">😊</div>
              <h5 className="fw-bold">Quality Guaranteed</h5>
              <p className="text-muted">
                All books are carefully selected and verified for authenticity
              </p>
            </Col>
            <Col md={4}>
              <div className="feature-icon mb-3">⚡</div>
              <h5 className="fw-bold">Fast Delivery</h5>
              <p className="text-muted">
                Quick and secure delivery right to your doorstep
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Featured Books</h2>
            <p className="lead text-muted">
              Check out our handpicked selection of must-read books
            </p>
          </div>
          {error && (
            <Alert variant="warning" className="mb-4">
              <Alert.Heading>Unable to load featured books</Alert.Heading>
              <p>{error}</p>
              <Button onClick={loadFeaturedBooks} variant="outline-warning" size="sm">
                Try Again
              </Button>
            </Alert>
          )}
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
              <p className="mt-3 text-muted">Loading featured books...</p>
            </div>
          ) : featuredBooks.length > 0 ? (
            <Row className="g-4">
              {featuredBooks.map(book => (
                <Col key={book.id} md={6} lg={4}>
                  <BookCard book={book} />
                </Col>
              ))}
            </Row>
          ) : !error ? (
            <div className="text-center py-5">
              <p className="text-muted">No featured books available at the moment.</p>
            </div>
          ) : null}
          <div className="text-center mt-5">
            <Button as={Link} to="/books" variant="primary" size="lg">
              View All Books
            </Button>
          </div>
        </Container>
      </section>

      <section className="cta-section text-white py-5">
        <Container className="text-center">
          <h2 className="display-5 fw-bold mb-3">Ready to Start Your Reading Journey?</h2>
          <p className="lead mb-4">
            Join thousands of readers who trust BookHaven for their next great read
          </p>
          <Button as={Link} to="/books" variant="light" size="lg">
            Explore Our Collection
          </Button>
        </Container>
      </section>
    </>
  )
}
