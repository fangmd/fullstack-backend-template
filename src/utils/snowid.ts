import { Snowflake } from 'nodejs-snowflake';

const uid = new Snowflake({});

/** 获取雪花id */
export const getSnowId = () => {
  return uid.getUniqueID() as any; // A 64 bit id is returned
};
