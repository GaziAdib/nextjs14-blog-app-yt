"use client";

import { updateBlog } from "@/actions/actions";
import Button from "@/app/ui/Button";
import { useRef } from "react";

const UpdateBlogForm = ({ blog }) => {

    const ref = useRef();
    const { id, title, imageUrl, category, description } = blog || {};

    // handle update
    const handleUpdateBlog = async (formData) => {
        await updateBlog(id, formData)
        ref?.current.reset();
    }


    return (
        <form ref={ref} action={handleUpdateBlog} className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl text-gray-800 font-semibold mb-6">Update Blog Post</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                    Update Image Link
                </label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={imageUrl ? imageUrl : ''}
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
                    defaultValue={title}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Enter title"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    defaultValue={description}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Enter description"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    defaultValue={category}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Enter category"
                />
            </div>

            <Button label={'Update Blog'} color={'green'} />

        </form>
    )
}

export default UpdateBlogForm