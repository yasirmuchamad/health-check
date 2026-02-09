import { PrismaClient } from "@prisma/client";

console.log("Prisma client loaded");
export const prisma = new PrismaClient();

