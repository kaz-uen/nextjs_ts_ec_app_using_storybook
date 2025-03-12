'use client';

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

const SignoutButtonContainer = () => {
  const router = useRouter();
  const { signout } = useAuthContext();

  const handleSignoutButtonClick = async () => {
    try {
      await signout();
      router.replace('/signin');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleSignoutButtonClick}>ログアウト</button>
  )
}

export default SignoutButtonContainer;
