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
            select: { upvotes: true }
        });

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

       const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: {
                upvotes: blog.upvotes + 1
            },
            select: { id: true, upvotes:true },
        });

        // revalidateTag('upvotes');

        return NextResponse.json({ message: 'Upvote Added', data: updatedBlog.upvotes }, { status: 200 });
    } catch (error) {
        console.error("Error while updating likes", error);
        return NextResponse.json({ message: 'Error occurred while Voting this blog' }, { status: 500 });
    } finally {
        revalidateTag('upvotes');
    }
}














