import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { planes } from "../routes/plane";
import { getUserRoutes } from "../routes/user";

export const prisma = new PrismaClient();
export const app = fastify();

app.register(getUserRoutes, { prefix: "user" });
app.register(planes, { prefix: "plane" });
