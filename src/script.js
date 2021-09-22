const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: "This is the first post",
            url: "localhost:4000/post",
        }
    })

  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
      throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
