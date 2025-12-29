import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Badge, Spinner, Alert } from 'react-bootstrap'
import { booksAPI } from '../services/api'
import { useCart } from '../context/CartContext'

export default function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const loadBook = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await booksAPI.getById(id)
      setBook(data)
    } catch (err) {
      console.error('Error loading book:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadBook()
  }, [loadBook])

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)
      await addToCart(book)
      setTimeout(() => {
        setIsAdding(false)
        navigate('/cart')
      }, 1000)
    } catch (err) {
      console.error('Error adding to cart:', err)
      setIsAdding(false)
    }
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Loading book details...</p>
      </Container>
    )
  }

  if (error || !book) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <h2>Book not found</h2>
          <p>{error || 'The book you are looking for does not exist.'}</p>
        </Alert>
        <Button as={Link} to="/books" variant="primary" className="mt-3">
          Back to Books
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Button as={Link} to="/books" variant="outline-secondary" className="mb-4">
        ← Back to Books
      </Button>

      <Row>
        <Col md={4}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={8}>
          <h1 className="fw-bold mb-3">{book.title}</h1>
          <h4 className="text-muted mb-3">by {book.author}</h4>
          <div className="mb-3">
            <Badge bg="secondary" className="me-2">{book.category}</Badge>
          </div>
          <h2 className="text-primary fw-bold mb-4">${book.price.toFixed(2)}</h2>
          <p className="lead mb-4">{book.description}</p>
          
          <div className="d-flex gap-3">
            <Button
              variant={isAdding ? 'success' : 'primary'}
              size="lg"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? '✓ Added to Cart!' : 'Add to Cart'}
            </Button>
            <Button
              as={Link}
              to="/cart"
              variant="outline-primary"
              size="lg"
            >
              View Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
