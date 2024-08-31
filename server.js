import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//Usando o body params: "req.body"
app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

// Usando o Query Paramns: "req.query"
app.get("/usuarios", async (req, res) => {
  let users = [];

  /**
   * Este if realiza busca:
   * De todos os usuarios;
   * A partir de nome
   * A partir de idade
   * A partir de email
   * A partir de nome e idade, idade ou email e assim por diante.
   */
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        age: req.query.age,
        email: req.query.email,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

// Usando Route Params: "usuarios/:id"
app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res
    .status(200)
    .json({ message: `Usuário ${req.body.name} deletado com Sucesso!` });
});

app.listen(3000);
