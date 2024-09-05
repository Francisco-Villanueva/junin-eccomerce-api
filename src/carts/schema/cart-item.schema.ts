import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Cart } from './carts.schema';
import { Product } from 'src/products/schema/product.schema';

@Table
export class CartItem extends Model<CartItem> {
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  count: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;
}
