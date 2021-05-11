import 'module-alias/register'
import app from './config/app'
import dotenv from 'dotenv'

dotenv.config()
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const PORT = process.env.PORT || 8080
// eslint-disable-next-line no-console
app.listen(PORT, () =>
  console.log(`server running at http://localhost:${PORT}`)
)
