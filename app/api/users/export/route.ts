import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/auth";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";

  const roleFilter = role === "admin" || role === "user" ? { role } : {};

  const users = await prisma.user.findMany({
    where: {
      ...roleFilter,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    select: {
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const header = "Name,Email,Role,Verified,Joined\n";
  const rows = users
    .map((u) =>
      [
        `"${u.name.replace(/"/g, '""')}"`,
        u.email,
        u.role,
        u.emailVerified ? "Yes" : "No",
        new Date(u.createdAt).toISOString().split("T")[0],
      ].join(",")
    )
    .join("\n");

  const csv = header + rows;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=flowdesk-users.csv",
    },
  });
}