import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../services/api'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load cart from backend on mount
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      setError(null)
      const items = await cartAPI.get()
      setCartItems(items)
    } catch (err) {
      console.error('Error loading cart:', err)
      setError(err.message)
      // Fallback to empty array if API fails
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (book) => {
    try {
      setError(null)
      const updatedCart = await cartAPI.add(book.id, 1)
      setCartItems(updatedCart)
    } catch (err) {
      console.error('Error adding to cart:', err)
      setError(err.message)
      throw err
    }
  }

  const removeFromCart = async (bookId) => {
    try {
      setError(null)
      await cartAPI.remove(bookId)
      setCartItems(prev => prev.filter(item => item.id !== bookId))
    } catch (err) {
      console.error('Error removing from cart:', err)
      setError(err.message)
      // Update UI optimistically even if API fails
      setCartItems(prev => prev.filter(item => item.id !== bookId))
    }
  }

  const updateQuantity = async (bookId, quantity) => {
    try {
      setError(null)
      if (quantity <= 0) {
        await removeFromCart(bookId)
        return
      }
      const updatedCart = await cartAPI.update(bookId, quantity)
      setCartItems(updatedCart)
    } catch (err) {
      console.error('Error updating cart:', err)
      setError(err.message)
      throw err
    }
  }

  const clearCart = async () => {
    try {
      setError(null)
      await cartAPI.clear()
      setCartItems([])
    } catch (err) {
      console.error('Error clearing cart:', err)
      setError(err.message)
      // Clear UI even if API fails
      setCartItems([])
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    loadCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
