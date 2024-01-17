"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();


export const fetchBlogs = async () => {
    const blogs = await prisma.blog.findMany({});
    return blogs
}


export const fetchSingleBlog = async (id) => {
    const blogs = await prisma.blog.findFirst({
        where: {
            id: id
        }
    });
    return blogs
}



export const addBlog = async (formData) => {


    // collect info from form using formData
    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');


    // push the data into the DB
    const new_blog = await prisma.blog.create({
        data: {
            imageUrl: imageUrl ? imageUrl : null,
            title,
            category,
            description
        }
    })

    revalidatePath('/blogs/add-blog')
    redirect('/blogs')


}



// Update a Blog


export const updateBlog = async (id, formData) => {

    // collect info from form using formData
    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');


    // push the data into the DB
    const updated_blog = await prisma.blog.update({
        where: {
            id: id,
        },
        data: {
            imageUrl: imageUrl ? imageUrl : null,
            title,
            category,
            description
        }
    })

    revalidatePath(`/blogs/update-blog/${id}`)
    redirect('/blogs')
}


// add Comment to a blog
export const addCommentToBlog = async (blogId, formData) => {
    // collect info from form using formData
    const text = formData.get('text');
    // push the data into the DB
    const added_comment = await prisma.comment.create({
        data: {
            blogId: blogId,
            text: text
        }
    })
    revalidatePath(`/blogs/${blogId}`)
    redirect(`/blogs/${blogId}`)
}




// fetching all comments
export const fetchComments = async (blogId) => {

    //const skip = (page - 1) * pageSize

    const comments = await prisma.comment.findMany({
        where: {
            blogId: blogId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 5, // pagination
    })

    return comments

}

// delete Comment by Id and blogId


export const deleteComment = async (commentId, blogId) => {

    await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

    revalidatePath(`/blogs/${blogId}`)

}
