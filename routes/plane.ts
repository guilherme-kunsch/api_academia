import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function planes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    try {
      const plane = await prisma.plano.findMany()
      return reply.send(plane);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Erro ao buscar planos" });
    }
  });
}
