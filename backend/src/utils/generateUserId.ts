import prisma from "../db/prisma.js";

export function generateRandomUserId(length: number = 8): string {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * 10).toString()
  ).join("");
}

export const generateUserId = async () => {
  const lastUser = await prisma.users.findFirst({
    orderBy: {
      user_id: "desc",
    },
  });

  const newEmployeeId = lastUser ? lastUser.user_id + 1 : 1000;

  return newEmployeeId;
}