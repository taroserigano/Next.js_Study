NEXT.JS 

Refer to the Next 14 Giov folder Read Me 









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

-----------------------------

    <HydrationBoundary state={dehydrate(queryClient)}>
- will make sure to output the previously fetched data
- and NOT the updated data - avoids confusion this way 


This is useful for passing prefetched queries from server to client or persisting queries to localStorage or other persistent locations. It only includes currently successful queries by default.

--------------------------------------

Hydration
 is the process of using client-side
 JavaScript to add application state and interactivity
 to server-rendered HTML. It's a feature of React
, one of the underlying tools that make the Gatsby
 framework
.
React Query supports prefetching
 multiple queries on the server in Remix and then dehydrating those queries to the queryClient. HydrationBoundary adds a previously dehydrated state into the queryClient that would be returned by useQueryClient(). If the client already contains data, the new queries will be intelligently merged based on update timestamp
.
To use HydrationBoundary, you first need to import it from React Query:
import { HydrationBoundary } from 'react-query';
Use code with caution.
Learn more
Then, you can wrap your app in a HydrationBoundary component:
<HydrationBoundary>
  <YourApp />
</HydrationBoundary>
Use code with caution.
Learn more
This will tell React Query to hydrate
 the state of your app on the client.

 ----------------------------------------------

 QueryClient.prefetchQuery 
 
 -is a function in React Query that adds data to the cache automatically, and can show while re-fetching.

  It can be used to fetch something before you render it so that you can see the data instantly once the user navigates to it. If you wait until useQuery tries to read the data, you will inevitably fetch later and thus see a loading spinner.

QueryClient.prefetchQuery is a function in React Query that adds data to the cache automatically, and can show while re-fetching. Prefetching can be used to manually prime or fetch data before a user queries it. This can improve the user experience and reduce waste time. 
One key difference between prefetchQuery and useQuery is that useQuery will re-execute whenever the cache is used. 
Here are some tips for using queryClient.prefetchQuery: 
Wrap queryClient.prefetchQuery in an if statement and not call it instead
setQueriesData is a synchronous function that can be used to immediately update cached data of multiple queries


Pre-FETCH and pass the cached data to children components:

  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getAllJobsAction({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobsList />
    </HydrationBoundary>
  );
}

you can also pre-fetch on the current page by traditional way:

  const { data, isPending } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });

  
  if (isPending) return <h2 className='text-xl font-medium'>Please wait...</h2>;
  if (!data || data.length < 1) return null;





  


---------------------------------------

you can also specify the id:

  await queryClient.prefetchQuery({
    queryKey: ['job', params.id],
    queryFn: () => getSingleJobAction(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );

and select spcific Job Page 

=---------------------------------------------------

    let params = new URLSearchParams(defaultParams);



  

----------------------------------

how to use Mutate in React Query:

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      toast({ description: 'job created' });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      router.push('/jobs');
      // form.reset();
    },
  });


  -----------------------------------------------


  1. set name as "mutate" for Functions
  2. use the mutate inside the return bracket:

  3. function DeleteJobBtn({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast({ description: 'job removed' });
    },
  });
  return (
    <Button
      size='sm'
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? 'deleting...' : 'delete'}
    </Button>
  );
}

----------------------------------------------

how to make PERSIST using Zod and Actions:

function CreateJobForm() {
  // 1. Define your form.
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      toast({ description: 'job created' });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      router.push('/jobs');
      // form.reset();
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }
  return (
    <Form {...form}>


    -----------------------------------------

how to pass down data to Child 
and then how Child can use the date to fetch data 

<PARENT>
async function AllJobsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getAllJobsAction({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobsList />
    </HydrationBoundary>
  );
}
</PARENT> 

<CHILD>
function JobsList() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search ?? '', jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });
  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  </CHILD> 



-----------------------------------





 const pathname = usePathname();

usePathname returns a string of the current URL's pathname. For example:

URL	Returned value
/	'/'
/dashboard	'/dashboard'
/dashboard?v=2	'/dashboard'
/blog/hello-world	'/blog/hello-world'



    let params = new URLSearchParams();

- will output the queries
-like name=john 

const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);

// Iterating the search parameters
for (const p of searchParams) {
  console.log(p);
}

console.log(searchParams.has("topic")); // true

------------------------------------------------
  

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;
    params.set('search', search);
    params.set('jobStatus', jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };



  ------------------------------------------
    


 
      







