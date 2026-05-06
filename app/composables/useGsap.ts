import { gsap } from 'gsap'

/**
 * Composable untuk menggunakan GSAP dengan manajemen memori otomatis.
 * Menggunakan gsap.context() untuk memastikan semua animasi dibersihkan
 * saat komponen di-unmount.
 *
 * @param fn Fungsi yang berisi logika animasi GSAP
 * @param scope (Opsional) Elemen root untuk scoping selektor
 */
export const useGsap = (fn: (ctx: gsap.Context) => void, scope?: Ref<HTMLElement | null> | HTMLElement) => {
  let ctx: gsap.Context

  onMounted(() => {
    ctx = gsap.context((context) => {
      fn(context)
    }, unref(scope) as Element)
  })

  onUnmounted(() => {
    if (ctx) {
      ctx.revert() // Membersihkan semua animasi, ScrollTrigger, dan listener
    }
  })

  return {
    gsap,
  }
}
