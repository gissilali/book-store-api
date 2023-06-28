import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var DATABASE: PrismaClient | undefined;
}

if (!global.DATABASE) {
  global.DATABASE = new PrismaClient();
}

db = global.DATABASE;

export { db };
