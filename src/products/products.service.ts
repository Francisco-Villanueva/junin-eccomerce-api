import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private readonly axiosInstance = axios.create({
    baseURL: process.env.API_URL,
  });
  async findAll(limit: number, skip: number): Promise<Product[]> {
    const response = await this.axiosInstance.get(
      `/products?${limit ? `limit=${limit}` : null}&${skip ? `skip=${skip}` : null}`,
    );
    return response.data;
  }
  async search(search: string): Promise<Product[]> {
    const response = await this.axiosInstance.get(
      `/products/search?q=${search}`,
    );
    return response.data;
  }

  async findOne(id: string): Promise<Product> {
    const response = await this.axiosInstance.get(`/products/${id}`);
    return response.data;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Assuming the API endpoint for creating a product is not provided
    // This is a placeholder for the actual implementation
    throw new Error('Method not implemented.');
  }

  async update(id: string, data: CreateProductDto): Promise<Product> {
    // Assuming the API endpoint for updating a product is not provided
    // This is a placeholder for the actual implementation
    throw new Error('Method not implemented.');
  }

  async remove(id: string): Promise<void> {
    // Assuming the API endpoint for removing a product is not provided
    // This is a placeholder for the actual implementation
    throw new Error('Method not implemented.');
  }

  async getCategories(): Promise<string[]> {
    const response = await this.axiosInstance.get('/products/categories');
    return response.data;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await this.axiosInstance.get(
      `/products/category/${category}`,
    );
    return response.data;
  }
}
