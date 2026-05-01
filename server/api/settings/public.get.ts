export default defineEventHandler(async (event) => {
  const commentSystem = await getSiteSetting(event, 'comment_system', 'polling')
  
  return {
    settings: {
      comment_system: commentSystem
    }
  }
})
