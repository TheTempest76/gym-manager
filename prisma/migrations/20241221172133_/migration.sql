/*
  Warnings:

  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attendanceId` on the `Attendance` table. All the data in the column will be lost.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `capacity` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `trainerId` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateOfBirth` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `membershipStatus` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `trainerId` on the `Member` table. All the data in the column will be lost.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `ClassEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trainer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `maxCapacity` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `paymentType` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "ClassEnrollment" DROP CONSTRAINT "ClassEnrollment_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassEnrollment" DROP CONSTRAINT "ClassEnrollment_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_memberId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
DROP COLUMN "attendanceId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "capacity",
DROP COLUMN "classId",
DROP COLUMN "description",
DROP COLUMN "duration",
DROP COLUMN "trainerId",
ADD COLUMN     "currentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "maxCapacity" INTEGER NOT NULL,
ADD COLUMN     "staffId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'scheduled',
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "dateOfBirth",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "memberId",
DROP COLUMN "membershipStatus",
DROP COLUMN "trainerId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ALTER COLUMN "phone" SET NOT NULL,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "paymentId",
DROP COLUMN "paymentMethod",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "paymentType" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'completed',
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ClassEnrollment";

-- DropTable
DROP TABLE "Trainer";

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastMaintenance" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
