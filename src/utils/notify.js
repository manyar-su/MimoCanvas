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

export const showResultModal = ({ success = true, title, content }) => {
  if (window.$dialog) {
    const fn = success ? window.$dialog.success : window.$dialog.error
    fn({
      title: title || (success ? 'Berhasil' : 'Gagal'),
      content,
      positiveText: 'OK'
    })
    return
  }

  if (window.$message) {
    if (success) window.$message.success(content)
    else window.$message.error(content)
  }
}
