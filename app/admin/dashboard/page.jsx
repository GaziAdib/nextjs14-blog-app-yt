import { fetchUsers } from "@/actions/actions"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminTable from "@/app/components/admin/AdminTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const AdminDashboard = async () => {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/login');
    }

    if (session?.user?.role !== "ADMIN") {
        redirect('/');
    }

    const users = await fetchUsers();

    return (
        <div className="mt-5 justify-center items-start flex">
            {users?.length > 0 && <AdminTable users={users} />}
        </div>
    )
}

export default AdminDashboard