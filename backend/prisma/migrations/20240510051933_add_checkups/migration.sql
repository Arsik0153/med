-- CreateTable
CREATE TABLE "Checkup" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checkup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checkup" ADD CONSTRAINT "Checkup_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
