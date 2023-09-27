"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session?.user?.name}</p>
        <button className="text-red-600" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button className="text-green-600 ml-auto" onClick={() => signIn("google")}>
      Sign In
    </button>
  );
};

export default Login;
