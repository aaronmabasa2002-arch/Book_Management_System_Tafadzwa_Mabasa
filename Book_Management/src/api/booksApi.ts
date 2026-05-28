import { apiClient } from './client'
import type { Book, BookFormData } from '../types/book'

export const booksApi = {
  async getAll(): Promise<Book[]> {
    const { data } = await apiClient.get<Book[]>('/books')
    return data
  },

  async getById(id: string): Promise<Book> {
    const { data } = await apiClient.get<Book>(`/books/${id}`)
    return data
  },

  async create(formData: BookFormData): Promise<Book> {
    const { data } = await apiClient.post<Book>('/books', formData)
    return data
  },

  async update(id: string, formData: BookFormData): Promise<Book> {
    const { data } = await apiClient.put<Book>(`/books/${id}`, formData)
    return data
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/books/${id}`)
  },
}
