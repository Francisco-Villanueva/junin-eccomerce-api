import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Debe ser un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export class CreateUserDTO extends createZodDto(CreateUserSchema) {}
