import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req, {params}) {

    const blogId = params.blogId || '';

    try {

        const comments = await prisma.comment.findMany({
            where: {
                blogId: blogId,
            }
        })
       
        return NextResponse.json({ message: 'Comments', comments: comments }, { status: 200 });

    } catch (error) {
        console.log("Error while Fetching", error);
        return NextResponse.json({ message: 'Error Occured While Fetching blogs.' }, { status: 500 });
    }
}