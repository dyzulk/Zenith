import { consola } from 'consola'
import type { H3Event } from 'h3'
import { useConfig } from './config'

/**
 * Log Driver (Laravel Log::info style)
 * Uses single-line JSON format in production for log analyzers (Cloudflare/Datadog)
 * Uses pretty colored format in local development
 */
export const useLogger = (event?: H3Event) => {
  // If event is provided, we can extract contextual info (like Request ID or IP)
  const isDev = event ? useConfig(event).isDev : (process.dev || process.env.NODE_ENV === 'development')

  const logger = consola.create({
    // If not in development, output raw JSON strings
    formatOptions: {
      compact: !isDev,
      colors: isDev
    },
    reporters: isDev ? undefined : [
      {
        log(logObj) {
          const payload = {
            level: logObj.type,
            tag: logObj.tag,
            date: logObj.date,
            message: logObj.args.map(String).join(' ')
          }
          console.log(JSON.stringify(payload))
        }
      }
    ]
  })

  return logger
}
