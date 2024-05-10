/*
  Warnings:

  - You are about to drop the column `score` on the `Checkup` table. All the data in the column will be lost.
  - Added the required column `content` to the `Checkup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Checkup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkup" DROP COLUMN "score",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
