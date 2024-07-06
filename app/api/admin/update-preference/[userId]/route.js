import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {
    try {


        const userId = params?.userId;

        const { selectedTags  } = await req.json();

        // logics
        
        // current user info or preferred topics

        let currentUser = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                interestedTopics: true
            }
        });

        // merge his topics to selected topics
        
        let currentTopics = currentUser?.interestedTopics || [];

        let allTopics = [...currentTopics, ...selectedTags];

        const updatePreference = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                interestedTopics: allTopics
            }
        });

        revalidatePath(`/blogs/add-blog-preference`)
    
        return NextResponse.json({ message: 'User Preference Updated Successfully!' }, { status: 201 });

    } 

     catch (error) {
        console.log("Error while Registeing", error);
        return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
    }
}