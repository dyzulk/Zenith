export class CommentRoom {
  state: any
  env: any
  sessions: Set<WebSocket>

  constructor(state: any, env: any) {
    this.state = state
    this.env = env
    this.sessions = new Set()
  }

  async fetch(request: Request) {
    console.log('[DO] Fetch URL:', request.url)
    const url = new URL(request.url)
    const upgradeHeader = request.headers.get('Upgrade')
    
    if (upgradeHeader === 'websocket') {
      const [client, server] = new WebSocketPair()
      await this.handleSession(server)
      return new Response(null, {
        status: 101,
        webSocket: client,
      })
    }

    // Fallback for non-websocket (e.g. GET stats)
    return new Response('Comment Room Active', { status: 200 })
  }

  async handleSession(ws: WebSocket) {
    ws.accept()
    this.sessions.add(ws)

    ws.addEventListener('message', async (msg) => {
      try {
        const payload = JSON.parse(msg.data as string)
        
        if (payload.type === 'comment') {
          const { user, body, is_spoiler, episode_id } = payload.data
          
          // 1. Broadcast immediately for "Instant" feel
          const commentData = {
            id: crypto.randomUUID(),
            user: user,
            body: body,
            is_spoiler: is_spoiler,
            created_at: new Date().toISOString()
          }

          this.broadcast(JSON.stringify({
            type: 'comment_received',
            data: commentData
          }))

          // 2. Persist to D1 in background
          if (this.env.DB) {
            await this.env.DB.prepare(`
              INSERT INTO comments (id, episode_id, user_id, body, is_spoiler, created_at)
              VALUES (?, ?, ?, ?, ?, ?)
            `).bind(
              commentData.id, 
              episode_id, 
              user.id, 
              body, 
              is_spoiler ? 1 : 0, 
              commentData.created_at
            ).run()
          }
        }
      } catch (e) {
        console.error('DO Message Error:', e)
      }
    })

    ws.addEventListener('close', () => {
      this.sessions.delete(ws)
    })
    
    ws.addEventListener('error', () => {
      this.sessions.delete(ws)
    })
  }

  broadcast(message: string) {
    for (const session of this.sessions) {
      try {
        session.send(message)
      } catch (e) {
        this.sessions.delete(session)
      }
    }
  }
}
