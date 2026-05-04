export default defineEventHandler(async (event) => {
  // Ported from Python worker
  return {
    message: "GoxStream Data Processor (Nuxt Port) is active!",
    status: "ready"
  }
})

