import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/login");
  console.log(session.user.id, process.env.ADMIN_ID);
  
  if (session.user.id !== process.env.ADMIN_ID) redirect("/");

  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const submissionsWithImages = await Promise.all(
    submissions?.map(async (s) => {
      const response = await fetch(
        `https://api.intra.42.fr/v2/users/${s.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
      if (!response.ok) return { ...s, image: null };
      const data = await response.json();
      await new Promise((r) => setTimeout(r, 2000));
      return { ...s, image: data?.image?.link ?? null };
    }) ?? [],
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Form Submissions ({submissionsWithImages?.length || 0})
        </h2>

        {submissionsWithImages && submissionsWithImages.length > 0 ? (
          <div className="space-y-4">
            {submissionsWithImages.map((submission) => (
              <div
                key={submission.id}
                className="rounded-lg border bg-gray-50 p-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="bg-red400 flex gap-4">
                    <Link
                      href={`https://profile.intra.42.fr/users/${submission.username}`}
                      target="_blank"
                    >
                      <Image
                        src={submission.image ?? "/avatar.jpeg"}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-[#0E0E0E]"
                      />
                    </Link>

                    <div className="">
                      <h3 className="text-lg font-semibold">
                        {submission.fullname}
                      </h3>
                      <p className="text-gray-600">@{submission.username}</p>
                      <p className="text-blue-600">{submission.email}</p>
                    </div>
                  </div>
                  <div className="bg-red400 justify-self-center">
                    <p className="text-sm text-gray-500">
                      {new Date(submission.created_at).toLocaleString("en-US", {
                        // timeZone: "Asia/Riyadh",
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="justify-self-end">
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        submission.email_sent
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submission.email_sent ? "Email sent" : "Email not sent"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Team:</strong> {submission.team}
                  </p>
                  <p>
                    <strong>Skills:</strong> {submission.skills.join(", ")}
                  </p>
                  <p>
                    <strong>Time Availability:</strong>{" "}
                    {submission.time_availability}
                  </p>
                  <p>
                    <strong>About:</strong> {submission.about}
                  </p>
                  {submission.notes && (
                    <p>
                      <strong>Notes:</strong> {submission.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No form submissions yet.</p>
        )}
      </div>
    </div>
  );
}
