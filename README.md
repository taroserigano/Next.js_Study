React-Query__
queryKey: ["todos", {searchTerm}] // second param is for specific search

staleTime: Infinity // this is, how long refetch will NOT be performed. // this will disable refetching over and over again if you fetch once and the value is the same (usually React Query refetch data over and over again)

cacheTime: 0 // will make disable caching

--------------

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000 * 5,
          },
        },
      })

staleTime - will give a little pause by NOT refetching everytime fetching occurs so that the web won't suffer from loading constantly. 


      







