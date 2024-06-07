import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { User } from '../graphql/auth/user.entity';

const mainOptions: DataSourceOptions = {
  type: 'mysql',
  url: 'mysql://root:root@localhost:3306/test',
  synchronize: true,
  entities: [User],
};

export default registerAs('orm', () => mainOptions);
