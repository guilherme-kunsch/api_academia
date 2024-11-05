import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";
import { error } from "console";

const prisma = new PrismaClient();

export async function getUserRoutes(app: FastifyInstance) {
  app.get("/", getUsers);
  app.get("/:nome", getUserName);
  app.post("/", createUserHandler);
  app.put("/:id", updateUserHandler);
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

async function getUserName(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { nome } = request.params as { nome: string };

    const user = await prisma.cadastroAluno.findFirst({
      where: {
        nome: nome,
      },
    });

    if (!user) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
    }

    return reply.send(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Erro de validação",
        issues: error.errors,
      });
    }
    console.error(error);
    return reply.status(500).send({ error: "Erro ao buscar o usuário" });
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
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Erro de validação",
        issues: error.errors,
      });
    }
    console.error(error);
    return reply.status(500).send({ error: "Erro ao criar usuário" });
  }
}

async function updateUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };
    const parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
      return reply
        .status(400)
        .send({ error: "ID inválido. O ID deve ser um número." });
    }

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

    const userData = createUserSchema.parse(request.body);

    const updateUser = await prisma.cadastroAluno.update({
      where: {
        id: parsedId,
      },
      data: {
        nome: userData.nome,
        sobrenome: userData.sobrenome,
        idade: userData.idade,
        endereco: userData.endereco,
        email: userData.email,
        peso: userData.peso,
        altura: userData.altura,
        planoEscolhidoId: userData.planoEscolhidoId,
        planoAtivo: userData.planoAtivo,
        dataPagamento: userData.dataPagamento,
      },
    });

    reply.send(updateUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Erro de validação",
        issues: error.errors,
      });
    }
    console.error(error);
    return reply.status(500).send({ error: "Erro ao editar usuário" });
  }
}

async function deleteUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };
    const parsedId = parseInt(id);

    if (Number.isNaN(parsedId)) {
      return reply
        .status(400)
        .send({ error: "ID inválido. O ID deve ser um número." });
    }

    const deleteUser = prisma.cadastroAluno.delete({
        where: {
            id: parsedId
        }
    });

    return reply.status(201).send(deleteUser)
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Erro de validação",
        issues: error.errors,
      });
    }
    console.error(error);
    return reply.status(500).send({ error: "Erro ao deletar usuário" });
  }
}
