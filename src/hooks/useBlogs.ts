import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api, type NewBlog } from "../services/api"

export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: api.getBlogs,
    })
}

export const useBlog = (id: string) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => api.getBlogById(id),
        enabled: !!id,
    })
}

export const useCreateBlog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newBlog: NewBlog) => api.createBlog(newBlog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
        },
    })
}
