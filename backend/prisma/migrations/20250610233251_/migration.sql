/*
  Warnings:

  - You are about to drop the column `alt` on the `attachment` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `attachment` table. All the data in the column will be lost.
  - Added the required column `title` to the `attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attachment" DROP COLUMN "alt",
DROP COLUMN "path",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
