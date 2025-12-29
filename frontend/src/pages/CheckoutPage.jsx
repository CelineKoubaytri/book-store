import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../services/api';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const cartTotal = getCartTotal();
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Send order to backend
      const orderData = {
        shippingAddress: address,
        paymentMethod: 'Cash on Delivery',
        cartItems: cartItems
      };

      const order = await ordersAPI.create(orderData);
      console.log('Order created:', order);
      
      // Clear cart after successful order
      await clearCart();
      setSubmitted(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Container className="py-5">
        <Card className="text-center p-4">
          <h3>Thank you for your order!</h3>
          <p>Your order has been placed. Please prepare cash for delivery.</p>
          <p>Redirecting to home...</p>
        </Card>
      </Container>
    );
  }

  if (cartItems.length === 0 && !submitted) {
    return (
      <Container className="py-5">
        <Card className="text-center p-4">
          <h3>Your cart is empty</h3>
          <p>Add some books to your cart before checkout.</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Checkout</h2>
      
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Order Summary</h5>
              <ul className="list-unstyled">
                {cartItems.map(item => (
                  <li key={item.id} className="mb-2">
                    {item.title} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <hr />
              <strong>Total: ${cartTotal.toFixed(2)}</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Delivery Details</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    disabled={loading || submitted}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery"
                    checked
                    readOnly
                  />
                </Form.Group>
                <Button 
                  variant="dark" 
                  type="submit" 
                  disabled={!address || loading || submitted || cartItems.length === 0}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Placing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}