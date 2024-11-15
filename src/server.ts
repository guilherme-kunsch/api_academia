import { app } from './app'
import { prisma } from './app';

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