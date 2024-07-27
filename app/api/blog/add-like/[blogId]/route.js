import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
    const blogId = params?.blogId || '';

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const blog = await prisma.blog.findFirst({
            where: { id: blogId },
            select: { userLikes: true, likes: true }
        });

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        const userLiked = blog.userLikes.includes(session.user.id);

        let updatedBlog;
        if (userLiked) {
            // User already liked, reduce like count
            updatedBlog = await prisma.blog.update({
                where: { id: blogId },
                data: {
                    likes: blog.likes - 1,
                    userLikes: {
                        set: blog.userLikes.filter((id) => id !== session.user.id),
                    },
                },
                select: { id: true, likes: true },
            });
        } else {
            // Add like
            updatedBlog = await prisma.blog.update({
                where: { id: blogId },
                data: {
                    likes: blog.likes + 1,
                    userLikes: {
                        push: session.user.id,
                    },
                },
                select: { id: true, likes: true },
            });
        }

       

        const message = userLiked ? 'Removed like from this blog' : 'Added like to this blog';
        return NextResponse.json({ message, data: updatedBlog.likes }, { status: 200 });
    } catch (error) {
        console.error("Error while updating likes", error);
        return NextResponse.json({ message: 'Error occurred while liking this blog' }, { status: 500 });
    } finally {
        revalidateTag('likes');
    }
}



















// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth";
// import { revalidateTag } from "next/cache";
// import { NextResponse } from "next/server";


// const prisma = new PrismaClient();

// export async function PUT(req, {params}) {

//     const blogId = params?.blogId || '';

//     const session = await getServerSession(authOptions);
    
    
//     try {

//         const blog = await prisma.blog.findFirst({
//            where: {
//             id: blogId,
//            },
//            select: {
//              userLikes: true,
//              likes: true
//            }
//         });

//         // check only unique user can add likes

//         const userLiked = blog.userLikes.includes(session?.user?.id);

//         if (userLiked) {
//             // User already liked, reduce like count
//             const updatedBlog = await prisma.blog.update({
//                 where: { id: blogId },
//                 data: {
//                 likes: blog.likes - 1,
//                 userLikes: {
//                     set: blog.userLikes.filter((id) => id !== session?.user?.id),
//                 },
//                 },
//                 select: {
//                 id: true,
//                 likes: true,
//                 },
//             });

//             revalidateTag('likes');
//             return NextResponse.json({ message: 'Removes Like from this blog', data: updatedBlog.likes}, { status: 200 });
           
//         } else {

//             const updatedBlogLikes = await prisma.blog.update({
//                 where: {
//                     id: blogId,
//                 },
//                 data: {
//                     likes: blog.likes + 1,
//                     userLikes: {
//                         push: session.user?.id
//                     }
//                 },
//             })
//             revalidateTag('likes');
//             return NextResponse.json({ message: 'Added Likes to this blog', data:updatedBlogLikes.likes}, { status: 200 });
//         }

      

//     } catch (error) {
//         console.log("Error while Searching", error);
//         return NextResponse.json({ message: 'Error Occured While Liking this Blog' }, { status: 500 });
//     }
// }