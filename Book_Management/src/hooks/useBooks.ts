import { useCallback, useEffect, useState } from 'react'
import { booksApi } from '../api/booksApi'
import { getErrorMessage } from '../api/getErrorMessage'
import type { Book, BookFormData } from '../types/book'

export const useBooks = (enabled: boolean) => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mutating, setMutating] = useState(false)

  const fetchBooks = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    setError(null)
    try {
      const data = await booksApi.getAll()
      setBooks(data)
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load books.'))
    } finally {
      setLoading(false)
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) {
      setBooks([])
      setError(null)
      setLoading(false)
      return
    }
    void fetchBooks()
  }, [enabled, fetchBooks])

  const addBook = useCallback(async (data: BookFormData) => {
    setMutating(true)
    setError(null)
    try {
      const book = await booksApi.create(data)
      setBooks((previous) => [book, ...previous])
      return book
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to add book.')
      setError(message)
      throw new Error(message)
    } finally {
      setMutating(false)
    }
  }, [])

  const updateBook = useCallback(async (id: string, data: BookFormData) => {
    setMutating(true)
    setError(null)
    try {
      const updated = await booksApi.update(id, data)
      setBooks((previous) =>
        previous.map((book) => (book.id === id ? updated : book)),
      )
      return updated
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to update book.')
      setError(message)
      throw new Error(message)
    } finally {
      setMutating(false)
    }
  }, [])

  const deleteBook = useCallback(async (id: string) => {
    setMutating(true)
    setError(null)
    try {
      await booksApi.remove(id)
      setBooks((previous) => previous.filter((book) => book.id !== id))
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to delete book.')
      setError(message)
      throw new Error(message)
    } finally {
      setMutating(false)
    }
  }, [])

  const getBookById = useCallback(
    (id: string) => books.find((book) => book.id === id),
    [books],
  )

  return {
    books,
    loading,
    error,
    mutating,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
  }
}
