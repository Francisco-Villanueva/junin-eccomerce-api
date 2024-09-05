import { Inject, Injectable } from '@nestjs/common';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PRODUCT_REPOSITORY } from 'src/database/constants';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productModel: typeof Product,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({ where: { id } });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productModel.create(createProductDto);
  }

  async update(id: string, data: CreateProductDto): Promise<Product> {
    const [affectedRows, updatedProduct] = await this.productModel.update(
      data,
      { where: { id }, returning: true },
    );
    if (affectedRows === 0) {
      throw new Error('Product not found');
    }
    return updatedProduct[0];
  }

  async remove(id: string): Promise<void> {
    await this.productModel.destroy({ where: { id } });
  }
}
