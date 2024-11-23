import prisma from "../db/prisma.js";

export const deleteExpiredTokens = async () => {
  await prisma.tokens.deleteMany({
    where: {
      expired_at: {
        lte: new Date(),
      },
    },
  });
};
