import {pino} from "pino"

export const logger = pino({
  name: 'tg-server',
  level: 'debug'
});