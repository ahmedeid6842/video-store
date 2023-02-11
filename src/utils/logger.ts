import { createLogger, format, transports } from "winston";

export const log = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level} : ${message}`;
    })
  ),
  transports: [new transports.Console()],
});
