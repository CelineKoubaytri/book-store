import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

export default function CartPage() {
  const { cartItems, getCartTotal, clearCart, loading } = useCart();
  const total = getCartTotal();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Loading cart...</p>
      </Container>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2 className="mb-4">Your cart is empty</h2>
        <p className="text-muted mb-4">Add some books to get started!</p>
        <Button as={Link} to="/books" variant="primary" size="lg">
          Browse Books
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Shopping Cart</h1>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </Card.Body>
          </Card>
          <Button
            variant="outline-danger"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '100px' }}>
            <Card.Body>
              <h5 className="mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span className="text-success">FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong className="text-primary">${total.toFixed(2)}</strong>
              </div>
              <Button variant="primary" size="lg" className="w-100 mb-2" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
              <Button
                as={Link}
                to="/books"
                variant="outline-secondary"
                className="w-100"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
