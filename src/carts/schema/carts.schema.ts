import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { CartItem } from './cart-item.schema';
import { User } from 'src/users/schema/user.schema';
@Table
export class Cart extends Model<Cart> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0,
  })
  totalPrice: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => CartItem)
  cartItems: CartItem[];
}
