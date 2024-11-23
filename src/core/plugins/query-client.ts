import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
})
