export default () => {
  const ormconfig = require(`D:/x.auto-service.md/x.auto-service-api/ormconfig.ts`);
  return {
    secret_key: process.env.SECRET_KEY,
    database: ormconfig,
  };
};
