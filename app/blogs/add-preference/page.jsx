import { fetchAllTags } from "@/actions/actions";
import AddPreferenceForm from "@/app/components/forms/AddPreferenceForm";

const AddPreferencePage = async () => {

    const tags = await fetchAllTags();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <AddPreferenceForm tags={tags} />
    </div>
  );
};

export default AddPreferencePage;