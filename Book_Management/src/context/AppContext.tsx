import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { setAccessToken } from '../api/client'
import { clearSession, loadSession, saveSession, type Session } from '../api/session'
import { useBooks } from '../hooks/useBooks'
import type { User } from '../types/auth'
import type { Book, BookFormData } from '../types/book'

type AppView =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'books'
  | 'add-book'
  | 'edit-book'

type AppContextValue = {
  user: User | null
  view: AppView
  editBookId: string | null
  books: Book[]
  booksLoading: boolean
  booksError: string | null
  booksMutating: boolean
  login: (session: Session) => void
  logout: () => void
  setView: (view: AppView) => void
  startEditBook: (id: string) => void
  refetchBooks: () => Promise<void>
  addBook: (data: BookFormData) => Promise<Book>
  updateBook: (id: string, data: BookFormData) => Promise<Book>
  deleteBook: (id: string) => Promise<void>
  getBookById: (id: string) => Book | undefined
}

const AppContext = createContext<AppContextValue | null>(null)

const initialSession = loadSession()
if (initialSession) {
  setAccessToken(initialSession.accessToken)
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => initialSession?.user ?? null)
  const [view, setView] = useState<AppView>(() =>
    initialSession ? 'dashboard' : 'landing',
  )
  const [editBookId, setEditBookId] = useState<string | null>(null)
  const {
    books,
    loading: booksLoading,
    error: booksError,
    mutating: booksMutating,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
  } = useBooks(!!user)

  const login = useCallback((session: Session) => {
    setAccessToken(session.accessToken)
    saveSession(session)
    setUser(session.user)
    setView('dashboard')
  }, [])

  const logout = useCallback(() => {
    setAccessToken(null)
    clearSession()
    setUser(null)
    setEditBookId(null)
    setView('landing')
  }, [])

  const startEditBook = useCallback((id: string) => {
    setEditBookId(id)
    setView('edit-book')
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      view,
      editBookId,
      books,
      booksLoading,
      booksError,
      booksMutating,
      login,
      logout,
      setView,
      startEditBook,
      refetchBooks: fetchBooks,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
    }),
    [
      user,
      view,
      editBookId,
      books,
      booksLoading,
      booksError,
      booksMutating,
      login,
      logout,
      startEditBook,
      fetchBooks,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
