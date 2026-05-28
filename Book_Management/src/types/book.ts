export type BookStatus = 'available' | 'borrowed' | 'reserved'

export type Book = {
  id: string
  title: string
  author: string
  isbn: string
  genre: string
  publishedYear: number
  quantity: number
  status: BookStatus
  description: string
  createdAt: string
  updatedAt: string
}

export type BookFormData = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>
