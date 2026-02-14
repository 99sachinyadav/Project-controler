import 'dotenv/config'
import { PrismaClient } from './generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@prisma/adapter-neon/config'    
import ws from 'ws'
neonConfig.webSocketConstructor = ws;
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
})
export const prisma = new PrismaClient({ adapter })