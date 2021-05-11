import { ExampleOrmRepository } from '@/infra/db/orm/example'
import { DbExample } from '@/data/usecases'
import { ExampleInterface } from '@/domain/usecases'

export const makeDbExample = (): ExampleInterface => {
  const patientPrismaRepository = new ExampleOrmRepository()
  return new DbExample(patientPrismaRepository)
}
