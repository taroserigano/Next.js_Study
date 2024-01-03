React-Query__
queryKey: ["todos", {searchTerm}] // second param is for specific search

staleTime: Infinity // this is, how long refetch will NOT be performed. // this will disable refetching over and over again if you fetch once and the value is the same (usually React Query refetch data over and over again)

cacheTime: 0 // will make disable caching









