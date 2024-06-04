const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
        { name: "Trading" },
        { name: "Maths & Physics" },
        { name: "Arts" },
      ],
    });
    console.log("Success seeding database categories");
  } catch (error) {
    console.log("error seeding database categories", error);
  } finally {
    await database.$disconnect();
  }
}
main();
