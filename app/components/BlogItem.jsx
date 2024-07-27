"use client";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useOptimistic, useState, useTransition } from 'react'
import { toast } from 'react-toastify';
import { FaThumbsUp } from 'react-icons/fa';

const BlogItem = ({ blog }) => {

    const { id, title, imageUrl, likes, userLikes, upvotes, description, category } = blog || {};

    const router = useRouter();

    const session = useSession();

    const userId = session?.data?.user?.id;

    const [pending, startTransition] = useTransition();


    const [likeCount, setLikeCount] = useState(likes);
    // votes

    const [voteCount, setVoteCount] = useState(upvotes);

    const [optimisticUpvote, addOptimisticUpvote] = useOptimistic(
        voteCount,
        (state, voteCount) => state + Number(voteCount)
      );

    const [userHasLiked, setUserHasLiked] = useState(userLikes.includes(userId)); // Adjust this to fit your actual data

    const [optimisticLikes, addOptimisticLikes] = useOptimistic(
        likeCount,
        (state, likeCount) => Number(state) + Number(likeCount)
      );

     

    const addLikes = async (blogId) => {
       
        try {

            // add optimistic likes 

            var likeChange = userHasLiked ? -1 : 1;

            startTransition(() => {
                addOptimisticLikes(likeChange);
            })

            likeChange === 1 ? setLikeCount((prev) => prev + 1) :  setLikeCount((prev) => prev - 1)

            setUserHasLiked(!userHasLiked);
            
        

            const res = await fetch(`/api/blog/add-like/${blogId}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                next: {tags: ['likes']},
                cache: 'no-store',
            });

            if(!res.ok) {
                const errorData = await res.json();
                console.log('Something went wrong:', errorData);
                startTransition(() => {
                    //setUserHasLiked(userHasLiked);
                    //likeChange === 1 ? setLikeCount((prev) => prev + 1) :  setLikeCount((prev) => prev - 1)
                    setLikeCount((prevCount) => Math.abs(prevCount - likeChange)); // Revert optimistic update
                    addOptimisticLikes(likeChange);
                   
                    //setUserHasLiked(userHasLiked);
                    
                });
            }

            if (res.ok) {
                const data = await res.json();
                startTransition(() => {
                    setLikeCount(data.data);
                    // addOptimisticLikes(likeChange);
                })
               
                toast.success(`${data.message}`, {
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
        } catch (error) {
           console.log('error', error);
            startTransition(() => {
            setLikeCount((prevCount) => Math.abs(prevCount - likeChange)); // Revert optimistic update
            // setUserHasLiked(userHasLiked);
            //likeChange === 1 ? setLikeCount((prev) => prev + 1) :  setLikeCount((prev) => prev - 1)
            addOptimisticLikes(likeChange);
            
        });
           
        }
    }




    const deleteBlogHandler = async (blogId) => {
        try {
            const res = await fetch(`/api/admin/remove-blog/${blogId}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: 'no-cache',
            });

            if (res.ok) {
                router.refresh();
                const data = await res.json();
                toast.success(`${data.message}`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
            } else {
                const errorData = await res.json();
                console.log('Something went wrong in else block');
                
            }
        } catch (error) {
           console.log('error', error);
        }

    }


    const addVote = async (blogId) => {
        try {
            
            startTransition(() => {
                addOptimisticUpvote(1);
                setVoteCount((prev) => prev+1);
            })

            const res = await fetch(`/api/blog/add-vote/${blogId}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                next: {tags: ['upvotes']},
                cache: 'no-store',
            });

         

            if (res.ok) {
                const data = await res.json();

                startTransition(() => {
                    setVoteCount(data.data);
                })
               
                toast.success(`${data.message}`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });

                    
            } else {
                const errorData = await res.json();
                console.log('Something went wrong');
                startTransition(() => {
                    addOptimisticUpvote(-1);
                    setVoteCount((prev) => prev-1);
                })
            }
        } catch (error) {
           console.log('error', error);
           startTransition(() => {
            addOptimisticUpvote(-1)
            setVoteCount((prev) => prev-1);
        })
        }
    }



    return (
        <div className="bg-gray-900 p-4 border-2 border-green-200 mx-2 my-2 rounded-lg shadow-md">

            <Link href={`/blogs/${id}`}>
                {imageUrl ? <Image
                    blurDataURL={imageUrl}
                    placeholder="blur"
                    loading="lazy"
                    width="600"
                    height="400"
                    quality={100} src={imageUrl} className="w-full h-[200px]  lg:h-[250px] object-cover mb-4 rounded-md" /> : null}
            </Link>

            <Link href={`/blogs/${id}`}>
                <h2 className='text-xl text-white font-semibold mb-2'>{title}</h2>
            </Link>


            <p className="mb-2 max-w-md text-green-500 inline-block border-2 p-2 border-green-300 rounded-full">{category}</p><span className='dark:text-white mx-3 px-2'>likes: {optimisticLikes}</span><span className='dark:text-white mx-3 px-2'>upvotes: {optimisticUpvote}</span>
            <p className="text-gray-300">{description.slice(0, 100)}...</p>

            <button type='button' onClick={() => deleteBlogHandler(id)} className='rounded-lg bg-red-700 text-center px-2 py-1  mt-4'>delete</button>

            <button type='button' onClick={() => addLikes(id)} className='rounded-lg cursor-pointer mx-2  bg-gray-800 text-center px-2 py-2  mt-6'>
                <FaThumbsUp 
                    size={'24'} 
                    style={{ color: userHasLiked ? 'blue' : 'white' }} 
                />
            </button>

         

            {userHasLiked ? <p className='text-white px-2 py-2'>you liked this blog!</p> : ''}

            <button type='button' onClick={() => addVote(id)} className='rounded-lg cursor-pointer mx-2 bg-purple-700 text-center px-2 py-1  mt-4'>Vote me!</button>
        </div>
    )
}

export default BlogItem