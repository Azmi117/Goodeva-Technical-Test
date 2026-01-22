-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('created', 'completed', 'on_going', 'problem');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'created',
    "problem_desc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
