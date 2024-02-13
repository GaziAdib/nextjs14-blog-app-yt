import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

import LogoutButton from "./ui/LogoutButton";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Home Page logged in User {session?.user?.username}</h2>
      <LogoutButton label={'Logout'} />
    </main>
  )
}
