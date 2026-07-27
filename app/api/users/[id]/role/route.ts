import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getSession } from "../../../../../lib/auth";
import { logAction } from "../../../../../lib/audit";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { role } = await request.json();

    if (role !== "admin" && role !== "user") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    await logAction(
      session.email,
      "role_change",
      `Changed ${updatedUser.email}'s role to ${role}`
    );

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Role update error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}