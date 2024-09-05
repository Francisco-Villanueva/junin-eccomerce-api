import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cart } from 'src/carts/schema/carts.schema';
import { Review } from 'src/reviews/schema/reviews.schema';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Cart)
  carts: Cart[];

  @HasMany(() => Review)
  reviews: Review[];
}
