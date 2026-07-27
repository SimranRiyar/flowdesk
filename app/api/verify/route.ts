import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json()

    const record = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
    })

    if (!record) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      )
    }

    await prisma.verificationCode.update({
      where: { id: record.id },
      data: { used: true },
    })

    await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Verify error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}