"server only"

import { PinataSDK } from "pinata"
import { env } from "@/lib/env"

export const pinata = new PinataSDK({
  pinataJwt: `${env.PINATA_JWT_TOKEN}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`
})