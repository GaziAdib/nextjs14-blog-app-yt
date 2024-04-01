"use client";

import { assignPermission } from "@/actions/actions";
import Button from "@/app/ui/Button";
import { useRef } from "react";

const AdminTable = ({ users }) => {

    const ref = useRef();

    const handleAssignPermission = async (formData) => {
        const userId = formData.get('userId');
        // logic to assign permissions
        await assignPermission(userId, formData);
        ref?.current?.reset();
        console.log('Assigning permissions done!')

    }

    return (
        <div className="container mx-auto mt-8">
            <table className="min-w-full border bg-gray-900">
                <thead>
                    <tr>
                        <th className="border p-4">ID</th>
                        <th className="border p-4">Email</th>
                        <th className="border p-4">Role</th>
                        <th className="border p-4">Permissions</th>
                        <th className="border p-4">Assign Permissions</th>
                        <th className="border p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sample data, replace with your actual data */}
                    {users.map((user, index) => {
                        return <tr key={user?.id}>
                            <td className="border p-4">{index + 1}</td>
                            <td className="border p-4">{user?.email}</td>
                            <td className="border p-4">{user?.role}</td>
                            <td className="border p-4">{user?.permissions}</td>
                            <td className="border p-4">
                                <form ref={ref} action={handleAssignPermission}>
                                    <input type="hidden" name="userId" value={user.id} />
                                    <input type="text" name="permission_name" className="mx-2 rounded-md text-center text-gray-900 shadow-md px-2 my-1 py-1" placeholder="assign permissions" />
                                    <Button label={'Assign'} color={'green'} />
                                </form>
                            </td>
                            <td className="border p-4">
                                <Button label={'Edit'} color={'blue'} />
                                <Button label={'Delete'} color={'purple'} />
                            </td>
                        </tr>
                    })}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    )
}

export default AdminTable