import z from 'zod'

const minMsg = (field: string, limit: number) => `${field} must be at least ${limit} character(s).`
const maxMsg = (field: string, limit: number) => `${field} cannot exceed ${limit} character(s).`

export const postValidation = z.object({
  caption: z.string().min(5, minMsg('Caption', 3)).max(2200, maxMsg('Username', 2200)),
  files: z.custom<File[]>(),
  location: z.string().min(2, minMsg('Location', 3)).max(100, maxMsg('Location', 100)),
  tags: z.string(),
})