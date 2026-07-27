import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "../../../components/ProfileForm";
import PasswordForm from "../../../components/PasswordForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your account information</p>

      {/* Summary card */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <div className="mt-2 flex gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.role === "admin"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {user.role === "admin" ? "Admin" : "User"}
            </span>
            {user.emailVerified ? (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                ✅ Verified
              </span>
            ) : (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                ⏳ Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Member since */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-sm text-gray-500">
          Member since{" "}
          {new Date(user.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Edit name */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900">Edit Name</h2>
        <ProfileForm currentName={user.name} />
      </div>

      {/* Change password */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900">Change Password</h2>
        <PasswordForm />
      </div>
    </div>
  );
}