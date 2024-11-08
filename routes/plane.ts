import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

export async function planes(app: FastifyInstance) {
  app.get("/", getPlaneAll);
  app.post("/", createPlane);
}

async function getPlaneAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const plane = await prisma.plano.findMany();
    return reply.send(plane);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Erro ao buscar planos" });
  }
}

async function createPlane(request: FastifyRequest, reply: FastifyReply) {
  const createPlaneSchema = z.object({
    nome: z.string(),
    quantidadeDias: z.number(),
    valor: z.string(),
  });

  try {
    const dataPlane = createPlaneSchema.parse(request.body);

    const plane = await prisma.plano.create({
      data: dataPlane
    })

    return reply.status(201).send(plane)
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Erro de validação",
        issues: error.errors,
      });
    }
    console.error(error);
    return reply.status(500).send({ error: error });
  }
}
