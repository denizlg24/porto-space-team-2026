import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);


/* 
* 
*  Esta rota chama-se catch all e está 
*  definida para o better-auth ter um 
*  sítio para montar os seu endpoints.
*  Não devem alterar esta rota. Se por
*  algum motivo o tiverem de fazer, tem
*  de alterar o ficheiro lib/auth.ts no
*  campo basePath dentro do better auth:
* 
*  Ex.:
*   betterAuth({
*     basePath: '/api/nova-rota',
*     ...
* })
* 
*/