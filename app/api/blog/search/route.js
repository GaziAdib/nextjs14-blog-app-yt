import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req, {params}) {

    const category_query = req?.nextUrl?.searchParams.get('search') || '';
    
    
    try {

        const blogs = await prisma.blog.findMany({
            where: category_query ? {
                category: {contains: category_query}
            } : 
            
            {}
        })
    
        return NextResponse.json({ message: 'Results', data: blogs}, { status: 200 });

    } catch (error) {
        console.log("Error while Searching", error);
        return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
    }
}