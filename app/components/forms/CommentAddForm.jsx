"use client"

import { addCommentToBlog, deleteComment, fetchComments } from "@/actions/actions"
import Button from "@/app/ui/Button"
import Image from "next/image"
import { useOptimistic, useRef, useTransition } from "react"
import { toast } from "react-toastify"
import { CommentListings } from "../CommentListings"


const CommentAddForm = ({ comments, blogId }) => {

    const ref = useRef();

    // add optimisticAddComment

    const [isPending, startTransition] = useTransition();


    const [optimisticComments, setOptimisticComments] = useOptimistic(
        comments,
        (state, newComment) => [...state, newComment]
    );
   

    // add comment feature
    const addCommentHandler = async (formData) => {

        const text = formData.get('text');


        // optimistically add comment instantly to user
        startTransition(() => {
            setOptimisticComments(
                {
                    id: Math.random(),
                    authorId: Math.random(),
                    text: text,
                },
            );
        })

        // add comment to a blog 
        await addCommentToBlog(blogId, formData)
        ref?.current?.reset();
        
        toast.success('New Comment Added', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deleteOptimisticComment = async (commentId, blogId) => {
      
         // Optimistically remove the comment
         startTransition(() => {
            setOptimisticComments((prevComments) => 
                 prevComments.filter(comment => comment.id !== commentId)
            );
        });

        // Delete the comment from the blog
        await deleteComment(commentId, blogId);

       
    };

    return (
        <>
            <h2 className="text-center font-semibold mt-5 mb-2 px-2 py-3">Add Your Comment</h2>
            <div className="h-[2px] w-1/4 items-center mx-auto bg-gray-600">

            </div>

            <form ref={ref} action={addCommentHandler} className="max-w-md flex mx-auto mt-8">

                <div className="mb-2 mr-5">
                    <Image className='rounded-full mt-6' src="https://avatars.githubusercontent.com/u/41202696?v=4" height={70} width={70} />
                </div>

                <div className="mb-4">
                    <label htmlFor="text" className="block  text-gray-600 font-medium">
                        Comment
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        placeholder="add text"
                        rows="4"
                        className="mt-1 p-2 w-600 text-gray-800 border rounded-md"
                        required
                    ></textarea>
                </div>
                <div className='mt-5 py-1 px-2'>
                    <Button label={'Add Comment'} color={'green'} />
                </div>
            </form>

            <div className="my-5 py-5">
                <CommentListings optimisticComments={optimisticComments} deleteOptimisticComment={deleteOptimisticComment} />
            </div>
        </>

    )
}

export default CommentAddForm