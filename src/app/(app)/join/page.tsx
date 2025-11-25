import { JoinForm } from "@/components/join-form";
import { checkFormCompletionStatus } from "@/lib/form-status";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const formStatus = await checkFormCompletionStatus();
  const session = await getSession();
  // // If user is not logged in, redirect to login
  if (!formStatus.isLoggedIn) redirect("/login");
  // // If user has already submitted the form, redirect to success page
  if (formStatus.hasSubmittedForm) redirect("/succ-join");

  return <JoinForm userData={session?.user} />;
}
