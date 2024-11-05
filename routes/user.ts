import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function getUserRoutes(app: FastifyInstance) {
  app.get("/", getUsers);
  app.post("/", createUserHandler);
}

async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await prisma.cadastroAluno.findMany();
    return reply.send(users);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Erro ao buscar usuários" });
  }
}

async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const createUserSchema = z.object({
    nome: z.string(),
    sobrenome: z.string(),
    idade: z.number(),
    endereco: z.string(),
    email: z.string().email(),
    peso: z.number(),
    altura: z.number(),
    planoEscolhidoId: z.number(),
    planoAtivo: z.number(),
    dataPagamento: z.string(),
  });

  try {
    const userData = createUserSchema.parse(request.body);

    const user = await prisma.cadastroAluno.create({
      data: userData,
    });

    return reply.status(201).send(user);
  } catch (error) {
    return reply.status(400).send(error);
  }
}
