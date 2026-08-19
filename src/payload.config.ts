import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'

import { Products } from './collections/Products'
import { Orders } from './collections/Orders'
import { Users } from './collections/Users'
import { Media } from './collections/Media'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Products, Orders, Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
})