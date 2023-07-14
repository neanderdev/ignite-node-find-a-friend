import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPetRequirementsRepository } from '@/repositories/prisma/prisma-pet-requirements-repository'

import { RegisterPetUseCase } from '../register-pet'

export const makeRegisterPetUseCase = (): RegisterPetUseCase => {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const prismaPetRequirementRepository = new PrismaPetRequirementsRepository()

  const registerPetUseCase = new RegisterPetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
    prismaPetRequirementRepository,
  )

  return registerPetUseCase
}
