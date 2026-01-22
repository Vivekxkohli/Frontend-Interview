import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Header } from "@/components/Header"
import BlogDetail from "@/pages/BlogDetail"
import CreateBlog from "@/pages/CreateBlog"
import MasterDetailLayout from "@/components/MasterDetailLayout"
import BlogPlaceholder from "@/components/BlogPlaceholder"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<MasterDetailLayout />}>
              <Route index element={<BlogPlaceholder />} />
              <Route path="blogs/:id" element={<BlogDetail />} />
            </Route>
            <Route path="/create" element={<CreateBlog />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
