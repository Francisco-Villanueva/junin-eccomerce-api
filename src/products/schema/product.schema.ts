import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { CartItem } from 'src/carts/schema/cart-item.schema';
import { Review } from 'src/reviews/schema/reviews.schema';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  availability: boolean;

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasMany(() => Review)
  reviews: Review[];
}
