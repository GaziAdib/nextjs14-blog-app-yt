import { fetchSingleBlog } from "@/actions/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UpdateBlogForm from "@/app/components/forms/UpdateBlogForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UpdateBlogPage = async ({ params }) => {

    const session = await getServerSession(authOptions);

    // as i have the permissions i can see this page / routes

    const checkPermissions = session?.user?.permissions?.includes('EDIT_BLOG');

    const admin = session?.user?.role === 'ADMIN';

    if (!admin && !checkPermissions) {
        console.log('YOU CANNOT EDIT!')
        redirect('/')
    }

    const id = params?.id;

    // get the db info for each blog to fill forms

    const blog = await fetchSingleBlog(id);

    return (
        <div>

            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>Update Blog Page</h2>

            <UpdateBlogForm blog={blog} />

        </div>
    )
}

export default UpdateBlogPage