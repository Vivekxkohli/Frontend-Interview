import axios from "axios"

const API_URL = "http://localhost:3001"

export interface Blog {
    id: string
    title: string
    category: string[]
    description: string
    date: string
    coverImage: string
    content: string
}

export type NewBlog = Omit<Blog, "id">

export const api = {
    getBlogs: async (): Promise<Blog[]> => {
        const response = await axios.get(`${API_URL}/blogs`)
        return response.data
    },

    getBlogById: async (id: string): Promise<Blog> => {
        const response = await axios.get(`${API_URL}/blogs/${id}`)
        return response.data
    },

    createBlog: async (blog: NewBlog): Promise<Blog> => {
        // Generate ID or let server handle it (json-server handles it if omitted, but our type includes id, so we omit it for creation)
        const response = await axios.post(`${API_URL}/blogs`, blog)
        return response.data
    },
}
