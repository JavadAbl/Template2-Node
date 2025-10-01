/* eslint-disable no-undef */

import { PrismaClient } from "../src/Infrastructure/Database/Prisma/index.js";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed your data here
  await prisma.user.createMany({
    data: users(),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//Seed Data--------------------------------------------------------------
function users() {
  return [
    {
      username: "Alice",
      email: "alice@example.com",
      password: hashSync("1", 10),
    },
    {
      username: "Alice2",
      email: "alice2@example.com",
      password: hashSync("1", 10),
    },
    {
      username: "e1",
      email: "e1",
      password: hashSync("p1", 10),
    },
  ];
}

/* function products(count) {
  const products = [];

  while (products.length < count) {
    const productDto = {
      name: "کالای نمونه " + Math.floor(Math.random() * 10000),
      price: parseFloat(Math.random() * 1000000),
      stock: Math.floor(Math.random() * 100),
      image: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
      description: "این توضیحی برای محصول است.",
    };

    const newProduct = {
      name: productDto.name,
      price: productDto.price,
      stock: productDto.stock,
      image: productDto.image || null,
      description: productDto.description || null,
    };

    products.push(newProduct);
  }
  console.log(products);

  return products;
} */
