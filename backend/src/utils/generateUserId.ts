import prisma from "../db/prisma.js";

export const generateUserId = async () => {
  const lastUser = await prisma.users.findFirst({
    orderBy: {
      user_id: "desc",
    },
  });

  const newEmployeeId = lastUser ? lastUser.user_id + 1 : 1000;

  return newEmployeeId;
}