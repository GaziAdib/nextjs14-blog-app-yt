"use client";

import { signOut } from "next-auth/react";

const LogoutButton = ({ label }) => {
    return (
        <button className="bg-red-600 mx-2 px-2 my-2 rounded-md text-white" onClick={() => signOut()}>{label}</button>
    )
}

export default LogoutButton