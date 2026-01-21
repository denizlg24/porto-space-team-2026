import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient } from "./db";

/* 
* Cliente do mongoDB, cached para evitar
* recriar conexões durante o desenvolvimento 
*/
const db = await getClient();

/* 
* Configurações do better-auth. Mais informações:
* https://www.better-auth.com/docs
*/
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: db.client,
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
});
