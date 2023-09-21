export default () => {
    const ormconfig = require("/home/dev/develop/shootbox-api/ormconfig.ts");
    return {
      secret_key: process.env.SECRET_KEY,
      database: ormconfig,
    };
  };