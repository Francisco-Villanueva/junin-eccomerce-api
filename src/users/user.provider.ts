import { USER_REPOSITORY } from 'src/database/constants';
import { User } from './schema/user.schema';

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
