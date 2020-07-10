import { Client } from "https://deno.land/x/mysql/mod.ts";
// config
import { DATABASE, TABLE } from "./config.ts";

const client = await new Client();

client.connect({
  hostname: "127.0.0.1",
  username: "your db username",
  password: "your db password",
  db: "",
});

const run = async () => {
  await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);

  await client.execute(`USE ${DATABASE}`);

 /**
   * @todo Uncomment to create table if needed
   */

  // delete table if it exists before

  // await client.execute(`DROP TABLE IF EXISTS ${TABLE.EMPLOYEE}`);

  // create table

  // await client.execute(`
  //   CREATE TABLE ${TABLE.EMPLOYEE} (
  //       id int(11) NOT NULL AUTO_INCREMENT,
  //       name varchar(100) NOT NULL,
  //       department varchar(100),
  //       isActive boolean NOT NULL default false,
  //       PRIMARY KEY (id)
  //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  // `);
  
};

run();

export default client;
