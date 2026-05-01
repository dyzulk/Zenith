export default defineEventHandler(async (event) => {
  deleteCookie(event, 'zenith_auth')
  return {
    success: true,
    message: 'Logged out successfully'
  }
})
