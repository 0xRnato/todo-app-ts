import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const strictQuery = process.env.NODE_ENV !== 'production';
      mongoose.set('strictQuery', strictQuery);
      return await mongoose.connect(process.env.DB_CONNECTION_STRING);
    },
  },
];
