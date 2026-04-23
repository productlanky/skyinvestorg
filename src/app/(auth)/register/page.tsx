import SignUpForm from "@/components/auth/SignUpForm";
import Loading from "@/components/ui/Loading"; 
import { Suspense } from "react";

 
export default function SignUp() {
  return <Suspense fallback={<Loading />}>
    <SignUpForm />
  </Suspense>;
}
