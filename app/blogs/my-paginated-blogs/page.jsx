import BlogItem from "@/app/components/BlogItem";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


const PaginatedBlogs = async ({searchParams}) => {


    const blogsPerPage = 3;

    const totalBlogsCount = await prisma.blog.count();

    const totalPages =  Math.ceil(Number(totalBlogsCount) / (blogsPerPage))
    
    const query = searchParams?.query || '';
    const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;


    const blogs = await prisma.blog.findMany({
        where: query ? {
            OR: [
                { title: { contains: query } },
                { category: { contains: query } },
            ],
        } : {},
        skip: Number(currentPage) > 0 && (Number(currentPage) - 1) * Number(blogsPerPage),
        take: Number(blogsPerPage),
        orderBy: {
            createdAt: 'desc'
        }
    })

    


    return (
        <div>
            <Search />
            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>All Paginated Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
                {blogs?.length > 0 && blogs?.map((blog) => (

                    <BlogItem key={blog?.id} blog={blog} />

                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage}  />
        </div>
    )
}

export default PaginatedBlogs