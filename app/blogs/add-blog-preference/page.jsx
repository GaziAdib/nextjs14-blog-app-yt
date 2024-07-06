import { fetchBlogsTags } from "@/actions/actions"
import AddPreferenceForm from "@/app/components/forms/AddPreferenceForm";

const AddBlogPreferencePage = async () => {

    const tags = await fetchBlogsTags();

  return (
    <div>
        
        <h1 className="text-3xl text-center mt-12 py-6 text-green-600">Add Preference Page</h1>

        <AddPreferenceForm tags={tags} />

    </div>
  )
}

export default AddBlogPreferencePage