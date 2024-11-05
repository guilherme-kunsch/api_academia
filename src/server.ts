import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { planes } from "../routes/plane";
import { getUserRoutes } from "../routes/user";

const prisma = new PrismaClient();
const app = fastify();

app.register(getUserRoutes, { prefix: "user" });
app.register(planes, { prefix: "plane" });

app
  .listen({ port: 3334 })
  .then(() => {
    console.log("HTTP Server Running on port 3334");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.addHook("onClose", async () => {
  await prisma.$disconnect();
});
