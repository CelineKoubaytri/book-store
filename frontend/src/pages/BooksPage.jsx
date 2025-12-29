import { useState, useMemo, useEffect } from 'react'
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap'
import { booksAPI } from '../services/api'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await booksAPI.getAll()
      setBooks(data)
    } catch (err) {
      console.error('Error loading books:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) return books
    
    const term = searchTerm.toLowerCase()
    return books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term)
    )
  }, [searchTerm, books])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading books...</span>
        </Spinner>
        <p className="mt-3">Loading books...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error loading books</Alert.Heading>
          <p>{error}</p>
          <Button onClick={loadBooks} variant="outline-danger">
            Try Again
          </Button>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Browse Our Collection</h1>
        <p className="lead text-muted">
          Find your next favorite book from our extensive catalog
        </p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by title, author, or category..."
      />

      {filteredBooks.length > 0 ? (
        <>
          <p className="text-muted mb-4">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          </p>
          <Row className="g-4">
            {filteredBooks.map(book => (
              <Col key={book.id} md={6} lg={4} xl={3}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className="text-center py-5">
          <h3 className="text-muted">No books found</h3>
          <p className="text-muted">Try adjusting your search term</p>
        </div>
      )}
    </Container>
  )
}
