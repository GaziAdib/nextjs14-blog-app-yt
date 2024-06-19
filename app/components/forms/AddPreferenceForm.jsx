"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";


const AddPreferenceForm = ({tags}) => {

    const session = useSession();

    const router = useRouter();

    const currentUserId = session?.data?.user?.id

    const [selectedTags, setSelectedTags] = useState([]);

    console.log('setSelectedTags', selectedTags)


    const savePreferences = async () => {

            try {
                const res = await fetch(`/api/admin/update-preference/${currentUserId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({selectedTags: selectedTags})
                });
    
                if (res.ok) {
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

                        router.push('/blogs/')    
                } else {
                    const errorData = await res.json();
                    console.log('Something went wrong in else block');
                    
                }
            } catch (error) {
               console.log('error', error);
            }
   
    }



    const handleSelectedTags = (tag) => {
        setSelectedTags((prev) => [...prev, tag])
    }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select Your Preferred Topics</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tags?.map((tag, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg text-center cursor-pointer ${
              selectedTags?.includes(tag) ? 'bg-blue-500 text-gray-800' : 'bg-gray-800'
            }`}
            onClick={() => handleSelectedTags(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
      <button
        onClick={savePreferences}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save Preferences
      </button>
    </div>
  )
}

export default AddPreferenceForm