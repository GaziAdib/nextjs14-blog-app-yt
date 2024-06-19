import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function PUT(req, {params}) {
  
    const userId = params?.userId || '';

    try {

        const { selectedTags } = await req.json();

         // Fetch current user's interested topics
        let currentUser = await prisma.user.findFirst({
        where: {
          id: userId
        },
        select: {
          interestedTopics: true
        }
      });


    let currentTopics = currentUser?.interestedTopics || [];

    // Merge current topics with selected tags, removing duplicates
    let allTopics = [...new Set([...currentTopics, ...selectedTags])];

        const updated_preference = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                interestedTopics: allTopics
            }
        })

        revalidatePath(`/blogs/add-preference`)
    
        return NextResponse.json({ message: 'User Preferences Updated Successfully!' }, { status: 201 });

    
    } catch (error) {
        console.log("Error while Registeing", error);
        return NextResponse.json({ message: 'Error Occured While Update Preference the user.' }, { status: 500 });
    }
}