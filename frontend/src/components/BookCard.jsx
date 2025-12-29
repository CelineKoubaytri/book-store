import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'


export default function BookCard({ book }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)
      await addToCart(book)
      setTimeout(() => setIsAdding(false), 1000)
    } catch (err) {
      console.error('Error adding to cart:', err)
      setIsAdding(false)
    }
  }

  return (
    <Card className="h-100 book-card">
      <Link to={`/books/${book.id}`} className="text-decoration-none">
        <Card.Img
          variant="top"
          src={book.coverImage}
          alt={book.title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/books/${book.id}`} className="text-decoration-none text-dark">
          <Card.Title className="fw-bold">{book.title}</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <div className="mb-2">
          <span className="badge bg-secondary">{book.category}</span>
        </div>
        <Card.Text className="text-muted small flex-grow-1">
          {book.description.substring(0, 100)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="h5 mb-0 text-primary fw-bold">${book.price.toFixed(2)}</span>
          <Button
            variant={isAdding ? 'success' : 'primary'}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? '✓ Added!' : 'Add to Cart'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
