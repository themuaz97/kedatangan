import prisma from "../db/prisma.js";

export const deleteExpiredTokens = async () => {
  await prisma.tokens.deleteMany({
    where: {
      expires_at: {
        lte: new Date(),
      },
    },
  });
};
