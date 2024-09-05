import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  image: z.string(),
});

export class CreateProductDto extends createZodDto(CreateProductSchema) {}
