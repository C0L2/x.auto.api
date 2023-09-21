var dbConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tequilabot',
  password: '-proshootbox',
  database: 'shootbox-db',
  synchronize: true,
  entities: ["dist/**/*.entity.js"],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
  migrationsRun: false,
};

module.exports = dbConfig;
