import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Running scripts...")

  // run test scripts here

  // CREATE USER
  // const createUserRes = await prisma.user.create({ data : { name: "Cody"}})
  // console.log(createUserRes);

  // DELETE USER
  // const deleteUserRes = await prisma.user.delete({ where: { id: 1}})
  // console.log("Deleted", deleteUserRes, "successfully");

  // FETCH USERS
  // const getUsersRes = await prisma.user.findMany()
  // console.log("All users:", getUsersRes);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
