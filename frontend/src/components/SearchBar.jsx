import { Form } from 'react-bootstrap'

export default function SearchBar({ value, onChange, placeholder = 'Search books...' }) {
  return (
    <Form.Control
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4"
      size="lg"
    />
  )
}
