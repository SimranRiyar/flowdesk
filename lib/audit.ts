import { prisma } from "./prisma";

export async function logAction(actorEmail: string, action: string, details: string) {
  try {
    await prisma.auditLog.create({
      data: { actorEmail, action, details },
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}