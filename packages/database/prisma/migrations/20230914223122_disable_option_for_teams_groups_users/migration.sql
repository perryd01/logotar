-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false;
