/**
 * Models Configuration
 */

export const SEEDREAM_SIZE_OPTIONS = [
  { label: '21:9', key: '3024x1296' },
  { label: '16:9', key: '2560x1440' },
  { label: '4:3', key: '2304x1728' },
  { label: '3:2', key: '2496x1664' },
  { label: '1:1', key: '2048x2048' },
  { label: '2:3', key: '1664x2496' },
  { label: '3:4', key: '1728x2304' },
  { label: '9:16', key: '1440x2560' },
  { label: '9:21', key: '1296x3024' }
]

export const SEEDREAM_4K_SIZE_OPTIONS = [
  { label: '21:9', key: '6198x2656' },
  { label: '16:9', key: '5404x3040' },
  { label: '4:3', key: '4694x3520' },
  { label: '3:2', key: '4992x3328' },
  { label: '1:1', key: '4096x4096' },
  { label: '2:3', key: '3328x4992' },
  { label: '3:4', key: '3520x4694' },
  { label: '9:16', key: '3040x5404' },
  { label: '9:21', key: '2656x6198' }
]

export const SEEDREAM_QUALITY_OPTIONS = [
  { label: 'Kualitas standar', key: 'standard' },
  { label: '4K', key: '4k' }
]

export const BANANA_SIZE_OPTIONS = [
  { label: '16:9', key: '16x9' },
  { label: '4:3', key: '4x3' },
  { label: '3:2', key: '3x2' },
  { label: '1:1', key: '1x1' },
  { label: '2:3', key: '2x3' },
  { label: '3:4', key: '3x4' },
  { label: '9:16', key: '9x16' }
]

export const IMAGE_MODELS = [
  { label: 'Google Veo 3.1 Fast I2V', key: 'google-veo-3-1-fast-i2v', provider: ['runpodImage'], imageMode: 'i2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Tongyi Z Image Turbo', key: 'z-image-turbo', provider: ['runpodImage'], imageMode: 't2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Qwen Image Edit 2511 LoRA', key: 'qwen-image-edit-2511-lora', provider: ['runpodImage'], imageMode: 'i2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Runpod Wan 2.6 T2I', key: 'wan-2-6-t2i', provider: ['runpodImage'], imageMode: 't2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Runpod Flux Schnell', key: 'black-forest-labs-flux-1-schnell', provider: ['runpodImage'], imageMode: 't2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Runpod Flux Dev', key: 'black-forest-labs-flux-1-dev', provider: ['runpodImage'], imageMode: 't2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Runpod P-Image T2I', key: 'p-image-t2i', provider: ['runpodImage'], imageMode: 't2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Nano Banana 2', key: 'google-nano-banana-2-edit', provider: ['runpodImage'], imageMode: 'i2i', sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Nano Banana Pro', key: 'nano-banana-pro', provider: ['chatfire'], sizes: BANANA_SIZE_OPTIONS.map(s => s.key), defaultParams: { size: '1x1', quality: 'standard', style: 'vivid' } },
  { label: 'Doubao Seedream 4.5', key: 'doubao-seedream-4-5-251128', provider: ['chatfire'], sizes: SEEDREAM_SIZE_OPTIONS.map(s => s.key), qualities: SEEDREAM_QUALITY_OPTIONS, getSizesByQuality: (quality) => quality === '4k' ? SEEDREAM_4K_SIZE_OPTIONS : SEEDREAM_SIZE_OPTIONS, defaultParams: { size: '2048x2048', quality: 'standard', style: 'vivid' } },
  { label: 'Nano Banana', key: 'nano-banana', provider: ['chatfire'], tips: 'Untuk model ini, rasio bisa ditulis langsung di prompt, misalnya: rasio 9:16', sizes: [], defaultParams: { quality: 'standard', style: 'vivid' } }
]

export const VIDEO_RATIO_LIST = [
  { label: '16:9 (Lanskap)', key: '16x9' },
  { label: '4:3', key: '4x3' },
  { label: '1:1 (Persegi)', key: '1x1' },
  { label: '3:4', key: '3x4' },
  { label: '9:16 (Potret)', key: '9x16' }
]

export const SEEDANCE_RESOLUTION_OPTIONS = [
  { label: '480p', key: '480p' },
  { label: '720p', key: '720p' },
  { label: '1080p', key: '1080p' }
]

export const VIDEO_MODELS = [
  { label: 'MiniMax Hailuo 02 Standard', key: 'minimax-hailuo-02-standard', provider: ['runpodImage'], type: 't2v+i2v', ratios: ['16:9', '9:16', '1:1'], durs: [{ label: '6 detik', key: 6 }, { label: '10 detik', key: 10 }], resolutions: ['720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 6, resolution: '1080p' } },
  { label: 'Pruna P-Video', key: 'pruna-video', provider: ['runpodImage'], type: 't2v+i2v', ratios: ['16:9', '9:16', '1:1'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' } },
  { label: 'Vidu Q3 Text-to-Video', key: 'vidu-q3-t2v', provider: ['runpodImage'], type: 't2v', ratios: ['16:9', '9:16', '1:1'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' } },
  { label: 'Vidu Q3 Image-to-Video', key: 'vidu-q3-i2v', provider: ['runpodImage'], type: 'i2v', ratios: ['16:9', '9:16', '1:1'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' } },
  { label: 'Kling v2.6 Motion Control', key: 'kling-v2-6-motion-control', provider: ['runpodImage'], type: 'i2v', ratios: ['16:9'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' } },
  { label: 'OpenAI SORA 2 I2V', key: 'sora-2-i2v', provider: ['runpodImage'], type: 'i2v', ratios: ['16:9', '9:16'], durs: [{ label: '4 detik', key: 4 }, { label: '8 detik', key: 8 }, { label: '12 detik', key: 12 }], resolutions: ['720p', '1080p'], defaultResolution: '720p', defaultParams: { ratio: '16:9', duration: 4, resolution: '720p' } },
  { label: 'Alibaba WAN 2.6 T2V', key: 'wan-2-6-t2v', provider: ['runpodImage'], type: 't2v', ratios: ['16:9', '9:16', '1:1'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['480p', '720p', '1080p'], defaultResolution: '720p', defaultParams: { ratio: '16:9', duration: 5, resolution: '720p' } },
  { label: 'Seedance 1.5 Pro (Gambar + Teks ke Video)', key: 'doubao-seedance-1-5-pro-251215', provider: ['chatfire'], type: 't2v+i2v', ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['480p', '720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 10, resolution: '1080p' } },
  { label: 'Seedance 1.0 Lite (Teks ke Video)', key: 'doubao-seedance-1-0-lite-t2v-250428', provider: ['chatfire'], type: 't2v', ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['480p', '720p', '1080p'], defaultResolution: '720p', defaultParams: { ratio: '16:9', duration: 5, resolution: '720p' } },
  { label: 'Seedance 1.0 Lite (Gambar ke Video)', key: 'doubao-seedance-1-0-lite-i2v-250428', provider: ['chatfire'], type: 'i2v', ratios: ['16:9'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['480p', '720p', '1080p'], defaultResolution: '720p', defaultParams: { ratio: '16:9', duration: 5, resolution: '720p' } },
  { label: 'Seedance 1.0 Pro (Gambar + Teks ke Video)', key: 'doubao-seedance-1-0-pro-250528', provider: ['chatfire'], type: 't2v+i2v', ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', '16:9'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['480p', '720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' } },
  { label: 'Seedance 1.0 Pro Fast (Gambar + Teks ke Video)', key: 'doubao-seedance-1-0-pro-fast-251015', provider: ['chatfire'], type: 't2v+i2v', ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'], durs: [{ label: '5 detik', key: 5 }, { label: '10 detik', key: 10 }], resolutions: ['480p', '720p', '1080p'], defaultResolution: '1080p', defaultParams: { ratio: '16:9', duration: 5, resolution: '1080p' } }
]

export const CHAT_MODELS = [
  { label: 'IBM Granite 4.0 H Small', key: 'ibm-granite-4-0-h-small', provider: ['runpodChat'] },
  { label: 'GPT-4o Mini', key: 'gpt-4o-mini', provider: ['openai'] },
  { label: 'GPT-4o', key: 'gpt-4o', provider: ['openai'] },
  { label: 'GPT-5.2', key: 'gpt-5.2', provider: ['openai'] },
  { label: 'ChatGPT 5.4', key: 'gpt-5.4', provider: ['openai'] },
  { label: 'Runpod OpenAI-Compatible Model', key: 'your-runpod-model', provider: ['runpodChat'] },
  { label: 'DeepSeek Chat', key: 'deepseek-chat', provider: ['openai', 'chatfire'] },
  { label: 'Sumopod OpenAI-Compatible Model', key: 'your-sumopod-model', provider: ['sumopod'] },
  { label: 'Doubao Seed Flash', key: 'doubao-seed-1-6-flash-250615', provider: ['chatfire'] },
  { label: 'Gemini 3 Pro', key: 'gemini-3-pro', provider: ['openai'] }
]

export const IMAGE_SIZE_OPTIONS = [
  { label: '2048x2048', key: '2048x2048' },
  { label: '1792x1024 (Lanskap)', key: '1792x1024' },
  { label: '1024x1792 (Potret)', key: '1024x1792' }
]

export const IMAGE_QUALITY_OPTIONS = [
  { label: 'Standar', key: 'standard' },
  { label: 'HD', key: 'hd' }
]

export const IMAGE_STYLE_OPTIONS = [
  { label: 'Vivid', key: 'vivid' },
  { label: 'Natural', key: 'natural' }
]

export const VIDEO_RATIO_OPTIONS = VIDEO_RATIO_LIST

export const VIDEO_DURATION_OPTIONS = [
  { label: '5 detik', key: 5 },
  { label: '10 detik', key: 10 }
]

export const DEFAULT_IMAGE_MODEL = 'wan-2-6-t2i'
export const DEFAULT_VIDEO_MODEL = 'doubao-seedance-1-5-pro-251215'
export const DEFAULT_CHAT_MODEL = 'gpt-4o-mini'
export const DEFAULT_IMAGE_SIZE = '2048x2048'
export const DEFAULT_VIDEO_RATIO = '16:9'
export const DEFAULT_VIDEO_DURATION = 5

export const getModelByName = (key) => {
  const allModels = [...IMAGE_MODELS, ...VIDEO_MODELS, ...CHAT_MODELS]
  return allModels.find(m => m.key === key)
}
