export default defineNitroPlugin(async (nitroApp) => {
  try {
    // Read the CA certificate from the linked asset
    // We use the storage system to ensure compatibility across environments
    const storage = useStorage('assets:server')
    const caCert = await storage.getItem('certs/aiven-ca.pem')

    if (caCert) {
      // Store globally for the singleton db connection logic to consume synchronously
      // Using a prefixed property on the global object
      ;(globalThis as any).__ZENITH_CA_CERT__ = caCert
      console.log('[Nitro Plugin] Database CA certificate loaded successfully from assets.')
    } else {
      console.warn('[Nitro Plugin] Database CA certificate not found in assets:certs/aiven-ca.pem')
    }
  } catch (error) {
    console.error('[Nitro Plugin] Error loading database CA certificate:', error)
  }
})
