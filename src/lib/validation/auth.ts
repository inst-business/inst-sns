import z from 'zod'

const minMsg = (field: string, limit: number) => `${field} must be at least ${limit} character(s).`
const maxMsg = (field: string, limit: number) => `${field} cannot exceed ${limit} character(s).`

export const SignupValidation = z.object({
  name: z.string().min(3, minMsg('Name', 3)),
  username: z.string().min(3, minMsg('Username', 3)).max(32, maxMsg('Username', 32)),
  email: z.string().email(),
  password: z.string().min(8, minMsg('Password', 8))
})
