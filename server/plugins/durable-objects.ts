import { CommentRoom } from '../utils/CommentRoom'

export default defineNitroPlugin((nitroApp) => {
  // Just touch it to ensure it's bundled
  (globalThis as any).CommentRoom = CommentRoom
})
