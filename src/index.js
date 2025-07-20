const { prisma } = require("../db/config");

async function createUserWithPost({ name, email, title, content }) {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email }
      });
      await tx.post.create({
        data: {
          title,
          content,
          authorId: user.id
        }
      });
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

module.exports = { createUserWithPost };