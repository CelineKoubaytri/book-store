import { Button, Form } from 'react-bootstrap'
import { useCart } from '../context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="d-flex align-items-center border-bottom py-3">
      <img
        src={item.coverImage}
        alt={item.title}
        style={{ width: '80px', height: '120px', objectFit: 'cover' }}
        className="rounded"
      />
      <div className="flex-grow-1 mx-3">
        <h6 className="mb-1">{item.title}</h6>
        <p className="text-muted mb-1 small">{item.author}</p>
        <p className="text-primary fw-bold mb-0">${item.price.toFixed(2)}</p>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </Button>
        <Form.Control
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
          style={{ width: '60px' }}
          className="text-center"
          min="1"
        />
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}
