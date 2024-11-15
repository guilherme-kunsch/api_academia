import request from 'supertest'
import { app } from "../app";
import { beforeAll, afterAll, test, expect } from "vitest";

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

test("user", async () => {
    await request(app.server)
        .post('/user')
        .send({
            nome: "Pedro",
            sobrenome: "Sarmento",
            idade: 25, 
            endereco: "Rua da Pica",
            email: "pedroa@gmail.com",
            peso: 70.0,
            altura: 1.75,
            planoEscolhidoId: 1,
            planoAtivo: 0,
            dataPagamento: "2024-11-01T14:30:00.000Z"
        })
        .expect(201)
})

