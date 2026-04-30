/**
 * Notification helpers | 通知辅助
 */

const pickMessage = (err) => {
  if (!err) return 'Terjadi kesalahan tidak dikenal.'
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error?.message ||
    err?.message ||
    String(err)
  )
}

export const buildFailureReason = (err, ctx = {}) => {
  const raw = pickMessage(err)
  const lower = raw.toLowerCase()
  const model = ctx.model ? `Model: ${ctx.model}` : ''
  const provider = ctx.provider ? `Provider: ${ctx.provider}` : ''

  let reason = raw

  if (lower.includes('401') || lower.includes('unauthorized') || lower.includes('api key') || lower.includes('invalid key')) {
    reason = 'API key tidak valid / expired. Silakan cek API key aktif di Pengaturan API.'
  } else if (lower.includes('403') || lower.includes('forbidden')) {
    reason = 'Akses ditolak. Kemungkinan model belum punya izin pada akun API key ini.'
  } else if (lower.includes('model') && (lower.includes('not found') || lower.includes('does not exist') || lower.includes('unsupported') || lower.includes('invalid'))) {
    reason = 'Model tidak sesuai / tidak tersedia pada provider yang dipilih.'
  } else if (lower.includes('404') || lower.includes('not found')) {
    reason = 'Endpoint tidak ditemukan. Cek Base URL dan endpoint provider.'
  } else if (lower.includes('429') || lower.includes('rate limit')) {
    reason = 'Terlalu banyak request. Coba lagi beberapa saat.'
  }

  return [
    reason,
    model,
    provider
  ].filter(Boolean).join('\n')
}

let lastToastKey = ''
let lastToastAt = 0

const shouldSkipDuplicate = (key) => {
  const now = Date.now()
  if (key && key === lastToastKey && now - lastToastAt < 1200) {
    return true
  }
  lastToastKey = key
  lastToastAt = now
  return false
}

export const showResultModal = ({ success = true, title, content }) => {
  if (!window.$message) return
  const text = [title, content].filter(Boolean).join(' - ')
  const key = `${success ? 'ok' : 'err'}:${text}`
  if (shouldSkipDuplicate(key)) return

  if (success) window.$message.success(text)
  else window.$message.error(text)
}
