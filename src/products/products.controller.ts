import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './schema/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Promise<Product[]> {
    return this.productsService.findAll(limit, skip);
  }
  @Get('/search')
  async search(@Query('search') search: string): Promise<Product[]> {
    return this.productsService.search(search);
  }

  @Get('/category-list')
  async getCategories(): Promise<string[]> {
    return this.productsService.getCategories();
  }

  @Get('/category/:category')
  async getProductsByCategory(
    @Param('category') category: string,
  ): Promise<Product[]> {
    return this.productsService.getProductsByCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}

@Controller('categories')
export class CategoriesController {
  constructor(private productsService: ProductsService) {}
}
