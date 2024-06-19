import { fetchPreferedBlogs } from "@/actions/actions";
import BlogItem from "@/app/components/BlogItem";

const MyPreferedBlogs = async () => {

  const blogs = await fetchPreferedBlogs();

  return (
    <div>
            <h2 className='text-center mt-4 px-2 text-green-400 text-3xl py-2 font-bold'>My Prefered Blogs</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
                {blogs?.length > 0 && blogs?.map((blog) => (

                    <BlogItem key={blog?.id} blog={blog} />

                ))}
            </div>


        </div>
  )
}

export default MyPreferedBlogs