import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import { redirect } from "next/navigation";
import UsersTable from "../../../components/UsersTable";
import SearchFilter from "../../../components/SearchFilter";
import Pagination from "../../../components/Pagination";
import ExportButton from "../../../components/ExportButton";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

interface UsersPageProps {
  searchParams: Promise<{ search?: string; role?: string; page?: string }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/dashboard");

  const params = await searchParams;
  const search = params.search || "";
  const role = params.role || "";
  const page = Math.max(1, Number(params.page) || 1);

  const roleFilter = role === "admin" || role === "user" ? { role } : {};
  const where = {
    ...roleFilter,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all registered users</p>
        </div>
        <ExportButton />
      </div>

      <div className="mt-6">
        <SearchFilter />
      </div>

      <div className="mt-4">
        <UsersTable users={users} />
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}