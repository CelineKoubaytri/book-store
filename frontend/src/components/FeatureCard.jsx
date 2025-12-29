import { Card } from 'react-bootstrap'


export default function FeatureCard({ icon, title, description }) {
  return (
    <Card className="h-100 border-0 shadow-sm hover-lift">
      <Card.Body className="text-center p-4">
        <div className="fs-1 mb-3">{icon}</div>
        <Card.Title className="fw-bold mb-3">{title}</Card.Title>
        <Card.Text className="text-muted">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
