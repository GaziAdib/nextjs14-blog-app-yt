import BlogItem from "@/app/components/BlogItem";
import Search from "@/app/components/Search"


const fetchBlogs = async (query="") => {
    
    try {

        const res = await fetch(`http://localhost:3000/api/my-blogs?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store' // to revalidate the cache or realtime see the blogs after you add
        })

        if(res.ok) {
            const rawData = await res.json();
            const blogs = rawData.data;
            return blogs
        }
        
    } catch (error) {
        console.log('error', error);
    }

}


const MyBlogs = async ({searchParams}) => {

    let query = searchParams?.query || '';
    
    const blogs = await fetchBlogs(query);

  
  return (
    <div>
            <Search />

            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>All My Blogs</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
                {blogs?.length > 0 && blogs?.map((blog) => (

                    <BlogItem key={blog?.id} blog={blog} />

                ))}
            </div>


        </div>
  )
}

export default MyBlogs