export default () => {
  const ormconfig = require('/home/dev/develop/x.auto-service-api.md/ormconfig.ts');
  return {
    secret_key: process.env.SECRET_KEY,
    database: ormconfig,
  };
};
