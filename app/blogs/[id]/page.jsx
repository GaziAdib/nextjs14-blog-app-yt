import { fetchSingleBlog } from "@/actions/actions";
import { CommentListings } from "@/app/components/CommentListings";
import CommentAddForm from "@/app/components/forms/CommentAddForm";
import Image from "next/image";
import Link from "next/link";

const BlogDetail = async ({ params }) => {

    const id = params?.id;

    const blog = await fetchSingleBlog(id);

    return (
        <div className="">
            <div className="text-center bg-gray-800 rounded-md border-2 border-green-600 shadow-md px-4 py-2 mx-3 my-3">

                {
                    blog?.imageUrl ?
                        <Image
                            blurDataURL={blog?.imageUrl}
                            placeholder="blur"
                            loading="lazy"
                            quality={100}
                            src={blog?.imageUrl}
                            alt={blog?.title}
                            width="600"
                            height="400"
                            className="w-full h-[600px] mt-2 px-2 py-2 object-cover mb-2 rounded-sm shadow-sm" /> : null
                }

                <h2 className="text-center font-extrabold text-lg mx-2 my-2 text-green-500">
                    ({blog?.category})
                </h2>
                <h3 className="font-semibold text-center text-2xl text-gray-200 my-2 mx-2 px-2 py-2">
                    " {blog?.title} "
                </h3>

                <p className="text-center text-gray-300 my-2 mx-2 px-2 py-2">
                    {blog?.description}
                </p>

                <Link className="text-gray-700 bg-gray-200 my-2 border-2 py-2 rounded-lg border-gray-400 shadow-sm mx-2 px-2" href={`/blogs/update-blog/${blog?.id}`}>Update Blog</Link>

            </div>

            <div>
                <CommentAddForm blogId={id} />
            </div>

            <div>
                <CommentListings blogId={id} />
            </div>

        </div>
    )
}

export default BlogDetail