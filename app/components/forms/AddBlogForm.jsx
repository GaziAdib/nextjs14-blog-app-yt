"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';

const AddBlogForm = () => {

    const ref = useRef();


    const router = useRouter();

    const {register, handleSubmit, control, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/admin/add-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                ref?.current?.reset();
                router.push('/blogs');
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


    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}  className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl text-green-500 font-semibold mb-6">Create a New Blog Post</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                    Upload Image Link
                </label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    {...register('imageUrl')}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Enter imageUrl"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    {...register('title', {required: true})}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Enter title"
                />
                   {errors?.title && <p role="alert">{errors?.title?.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    {...register('description')}
                    rows="4"
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Enter description"
                ></textarea>
            </div>

            <div className="mb-4">
            <label htmlFor="tags" className="block text-sm mt-2 p-1 font-medium text-gray-600 dark:text-gray-400">Blog Tags (UI Design, Testing, Coding) *</label>
            <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                <div className="my-3 py-2">
                    <ul className="list-disc list-inside">
                    {field?.value?.map((tag, index) => (
                        <li key={index} className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 mb-1 px-2 py-1 rounded-md">
                        {tag}
                        </li>
                    ))}
                    </ul>
                    <TagsInput
                        type="text"
                        {...field}
                        className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    />
                </div>
                )}
            />
            </div>


           

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    {...register('category', {required: true})}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Enter category"
                />
            </div>

            <Button label={'Add Blog'} color={'green'} />

        </form>
    )
}

export default AddBlogForm