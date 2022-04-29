import { Snowflake } from 'nodejs-snowflake';

const uid = new Snowflake({});

export const getSnowId = () => {
  return uid.getUniqueID(); // A 64 bit id is returned
};
