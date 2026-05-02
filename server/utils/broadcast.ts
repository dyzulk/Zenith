import Pusher from 'pusher'
import type { H3Event } from 'h3'
import { useConfig } from './config'
import { useLogger } from './logger'

let pusherInstance: Pusher | null = null

export const useBroadcast = (event: H3Event) => {
  const config = useConfig(event)
  const logger = useLogger(event).withTag('Broadcast')

  if (!pusherInstance) {
    if (!config.pusherAppId || !config.pusherKey || !config.pusherSecret || !config.pusherCluster) {
      logger.error('Missing Pusher credentials in environment')
    } else {
      pusherInstance = new Pusher({
        appId: config.pusherAppId,
        key: config.pusherKey,
        secret: config.pusherSecret,
        cluster: config.pusherCluster,
        useTLS: true,
      })
    }
  }

  return {
    /**
     * Start building a broadcast event for a specific channel
     */
    channel: (channelName: string) => {
      return {
        /**
         * Emit an event with data to the selected channel
         */
        emit: async (eventName: string, data: any) => {
          if (!pusherInstance) {
            logger.warn(`Skipped emitting [${eventName}] to channel [${channelName}] due to missing configuration.`)
            return false
          }

          try {
            await pusherInstance.trigger(channelName, eventName, data)
            logger.info(`Emitted [${eventName}] to channel [${channelName}]`)
            return true
          } catch (error) {
            logger.error(`Failed to emit [${eventName}] to channel [${channelName}]`, error)
            return false
          }
        }
      }
    }
  }
}
