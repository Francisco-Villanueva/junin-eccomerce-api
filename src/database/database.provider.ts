import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/schema/user.schema';
import { Product } from 'src/products/schema/product.schema';
import { Cart } from 'src/carts/schema/carts.schema';
import { CartItem } from 'src/carts/schema/cart-item.schema';
import { Review } from 'src/reviews/schema/reviews.schema';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
      });
      sequelize.addModels([User, Product, Cart, CartItem, Review]);

      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
