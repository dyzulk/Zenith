export default defineEventHandler(async (event) => {
  // Ported from Python worker
  return {
    message: "Zenith Data Processor (Nuxt Port) is active!",
    status: "ready"
  }
})
