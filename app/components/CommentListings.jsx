"use client";

import CommentItem from "./CommentItem";

export const CommentListings = ({ optimisticComments, deleteOptimisticComment }) => {

    return (
        <div className="">

            <h2 className='font-semibold text-center text-gray-200 my-2 mx-2 px-2 py-2'>All Comments ({optimisticComments?.length})</h2>

            {
                optimisticComments?.length > 0 ? optimisticComments?.map((comment) => {
                    return <CommentItem key={comment?.id} comment={comment} deleteOptimisticComment={deleteOptimisticComment} />
                }) : <p className="text-center mx-auto text-red-600 mb-5">There is no comments left...😥</p>
            }

        </div>
    )
}
