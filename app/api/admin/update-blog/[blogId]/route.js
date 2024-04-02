import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient();

export async function PUT(req, {params}) {
    try {

        const session = await getServerSession(authOptions);

        const id = params?.blogId;


        const { imageUrl, title, category, description } = await req.json();

   
    
    if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('CREATE_BLOG')) {
        // push the data into the DB
        const new_blog = await prisma.blog.update({
            where: {
                id: id
            },
            data: {
                imageUrl: imageUrl ? imageUrl : null,
                title,
                category,
                description,
                authorId: session?.user?.id
            }
        })

        revalidatePath(`/blogs`)
    
        return NextResponse.json({ message: 'Blog Updated Successfully!' }, { status: 201 });

    } else {

        return NextResponse.json({ message: 'You Do not have Add blog permissions!' }, { status: 403 });

    }

    
    
    } catch (error) {
        console.log("Error while Registeing", error);
        return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
    }
}