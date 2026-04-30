<template>
  <!-- API Settings Modal | API 设置弹窗 -->
  <n-modal v-model:show="showModal" preset="card" title="Pengaturan API" style="width: 560px;">
    <n-tabs type="line" animated>
      <!-- API 配置标签 -->
      <n-tab-pane name="api" tab="Konfigurasi API">
        <n-form ref="formRef" :model="formData" label-placement="left" label-width="80">
          <n-form-item label="Penyedia" path="provider">
            <n-select
              v-model:value="formData.provider"
              :options="providerOptions"
              placeholder="Pilih penyedia API"
            />
          </n-form-item>
          <n-form-item label="Base URL" path="baseUrl">
            <n-input
              v-model:value="formData.baseUrl"
              :placeholder="baseUrlPlaceholder"
            />
          </n-form-item>
          <n-form-item label="API Key" path="apiKey">
            <n-input
              v-model:value="formData.apiKey"
              type="password"
              show-password-on="click"
              placeholder="Masukkan API Key"
            />
          </n-form-item>
          <n-form-item label="Key model">
            <n-input
              v-model:value="formData.runpodModelKeys"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder='JSON opsional untuk Runpod per model, contoh: {"black-forest-labs-flux-1-schnell":"rpa_xxx"}'
            />
          </n-form-item>

          <n-divider title-placement="left" class="!my-3">
            <span class="text-xs text-[var(--text-secondary)]">Path endpoint</span>
          </n-divider>
          
          <div class="endpoint-list">
            <div class="endpoint-item">
              <span class="endpoint-label">Chat</span>
              <n-tag size="small" type="info" class="endpoint-tag">{{ currentEndpoints.chat }}</n-tag>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-label">Gambar</span>
              <n-tag size="small" type="success" class="endpoint-tag">{{ currentEndpoints.image }}</n-tag>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-label">Pembuatan video</span>
              <n-tag size="small" type="warning" class="endpoint-tag">{{ currentEndpoints.video }}</n-tag>
            </div>
            <div class="endpoint-item">
              <span class="endpoint-label">Pencarian video</span>
              <n-tag size="small" type="warning" class="endpoint-tag">{{ currentEndpoints.videoQuery }}</n-tag>
            </div>
          </div>

          <n-alert v-if="!isConfigured" type="warning" title="Belum dikonfigurasi" class="mb-4">
            <div class="flex flex-col gap-2">
              <p>Atur API Key untuk menggunakan fitur AI</p>
              <a 
                href="https://api.chatfire.site/login?inviteCode=EEE80324" 
                target="_blank"
                class="text-[var(--accent-color)] hover:underline text-sm flex items-center gap-1"
              >
                🔗 Dapatkan API Key
                <span class="text-xs">(registrasi pengguna baru)</span>
              </a>
            </div>
          </n-alert>

          <n-alert v-else type="success" title="Sudah dikonfigurasi" class="mb-4">
            API siap digunakan untuk fitur AI
          </n-alert>

          <n-alert v-if="providerHint" type="info" class="mb-4">
            {{ providerHint }}
          </n-alert>
        </n-form>
      </n-tab-pane>

      <!-- 模型配置标签 -->
      <n-tab-pane name="models" tab="Konfigurasi model">
        <div class="model-config-section">
          <div class="model-group">
            <div class="model-group-header">
              <span class="model-group-title">Sinkron cepat Runpod</span>
            </div>
            <div class="model-input-row">
              <n-button size="small" type="primary" @click="handleSyncRunpodModels">
                Sync model Runpod publik
              </n-button>
            </div>
          </div>

          <!-- 问答模型 -->
          <div class="model-group">
            <div class="model-group-header">
              <span class="model-group-title">Model chat</span>
              <n-tag size="tiny" type="info">{{ allChatModels.length }}</n-tag>
            </div>
            <div class="model-input-row">
              <n-input
                v-model:value="newChatModel"
                placeholder="Masukkan nama model, misalnya gpt-4o"
                size="small"
                @keyup.enter="handleAddChatModel"
              />
              <n-button size="small" type="primary" @click="handleAddChatModel" :disabled="!newChatModel">
                Tambah
              </n-button>
            </div>
            <div class="model-tags">
              <n-tag
                v-for="model in allChatModels"
                :key="model.key"
                size="small"
                :closable="model.isCustom"
                :type="model.isCustom ? 'info' : 'default'"
                @close="handleRemoveChatModel(model.key)"
              >
                {{ model.label }}
              </n-tag>
            </div>
          </div>

          <!-- 图片模型 -->
          <div class="model-group">
            <div class="model-group-header">
              <span class="model-group-title">Model gambar</span>
              <n-tag size="tiny" type="success">{{ allImageModels.length }}</n-tag>
            </div>
            <div class="model-input-row">
              <n-input
                v-model:value="newImageModel"
                placeholder="Masukkan nama model, misalnya dall-e-3"
                size="small"
                @keyup.enter="handleAddImageModel"
              />
              <n-button size="small" type="primary" @click="handleAddImageModel" :disabled="!newImageModel">
                Tambah
              </n-button>
            </div>
            <div class="model-tags">
              <n-tag
                v-for="model in allImageModels"
                :key="model.key"
                size="small"
                :closable="model.isCustom"
                :type="model.isCustom ? 'success' : 'default'"
                @close="handleRemoveImageModel(model.key)"
              >
                {{ model.label }}
              </n-tag>
            </div>
          </div>

          <!-- 视频模型 -->
          <div class="model-group">
            <div class="model-group-header">
              <span class="model-group-title">Model video</span>
              <n-tag size="tiny" type="warning">{{ allVideoModels.length }}</n-tag>
            </div>
            <div class="model-input-row">
              <n-input
                v-model:value="newVideoModel"
                placeholder="Masukkan nama model, misalnya sora-2"
                size="small"
                @keyup.enter="handleAddVideoModel"
              />
              <n-button size="small" type="primary" @click="handleAddVideoModel" :disabled="!newVideoModel">
                Tambah
              </n-button>
            </div>
            <div class="model-tags">
              <n-tag
                v-for="model in allVideoModels"
                :key="model.key"
                size="small"
                :closable="model.isCustom"
                :type="model.isCustom ? 'warning' : 'default'"
                @close="handleRemoveVideoModel(model.key)"
              >
                {{ model.label }}
              </n-tag>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>

    <template #footer>
      <div class="flex justify-between items-center">
        <a 
          href="https://api.chatfire.site/login?inviteCode=EEE80324" 
          target="_blank"
          class="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
        >
          Belum punya API Key? Klik untuk daftar
        </a>
        <div class="flex gap-2">
          <n-button @click="handleClear" tertiary>Hapus konfigurasi</n-button>
          <n-button @click="showModal = false">Batal</n-button>
          <n-button type="primary" @click="handleSave">Simpan</n-button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
/**
 * API Settings Component | API 设置组件
 * Modal for configuring API key, base URL, and custom models
 */
import { ref, reactive, watch, computed } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, NAlert, NDivider, NTag, NTabs, NTabPane, NSelect } from 'naive-ui'
import { useModelStore } from '../stores/pinia'
import { getProviderConfig } from '../config/providers'

// Props | 属性
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

// Emits | 事件
const emit = defineEmits(['update:show', 'saved'])

// API Config 状态
const isConfigured = computed(() => !!modelStore.currentApiKey)

// Model Store (Pinia) | 模型配置 Store
const modelStore = useModelStore()

// Provider options for select | 渠道下拉选项
const providerOptions = modelStore.providerList.map(p => ({
  label: p.label,
  value: p.key
}))

// 当前渠道的端点路径
const currentEndpoints = computed(() => {
  const config = getProviderConfig(formData.provider)
  return config.endpoints || {
    chat: '/chat/completions',
    image: '/v1/images/generations',
    video: '/v1/videos',
    videoQuery: '/v1/videos/{taskId}'
  }
})

const baseUrlPlaceholder = computed(() => {
  const placeholders = {
    chatfire: 'https://api.chatfire.site',
    openai: 'https://api.openai.com',
    sumopod: 'Isi sesuai base URL dari dashboard Sumopod',
    runpodChat: 'https://api.runpod.ai/v2/YOUR_ENDPOINT_ID/openai/v1',
    runpodImage: 'https://api.runpod.ai/v2'
  }
  return placeholders[formData.provider] || 'Masukkan base URL API'
})

const providerHint = computed(() => {
  const hints = {
    sumopod: 'Sumopod diintegrasikan sebagai provider OpenAI-compatible. Isi Base URL sesuai endpoint resmi yang Anda dapatkan dari dashboard Sumopod.',
    runpodChat: 'Untuk Runpod Chat, gunakan base URL endpoint OpenAI-compatible, misalnya https://api.runpod.ai/v2/<ENDPOINT_ID>/openai/v1.',
    runpodImage: 'Untuk Runpod Image, isi base URL dengan https://api.runpod.ai/v2 lalu gunakan nama model sebagai slug endpoint Runpod, misalnya black-forest-labs-flux-1-schnell.'
  }
  return hints[formData.provider] || ''
})

// 全局模型列表（不区分渠道）
const allChatModels = computed(() => modelStore.allChatModels)
const allImageModels = computed(() => modelStore.allImageModels)
const allVideoModels = computed(() => modelStore.allVideoModels)

// Modal visibility | 弹窗可见性
const showModal = ref(props.show)

// Form data | 表单数据
const formData = reactive({
  provider: modelStore.currentProvider,
  apiKey: '',
  baseUrl: '',
  runpodModelKeys: ''
})

// New model inputs | 新模型输入
const newChatModel = ref('')
const newImageModel = ref('')
const newVideoModel = ref('')

const RUNPOD_IMAGE_MODELS = [
  'black-forest-labs-flux-1-dev',
  'black-forest-labs-flux-1-schnell',
  'flux-kontext-dev',
  'p-image-t2i',
  'p-image-edit',
  'qwen-image',
  'qwen-image-lora',
  'qwen-image-edit',
  'qwen-image-edit-2511',
  'qwen-image-edit-2511-lora',
  'seedream-4-0-t2i',
  'seedream-4-0-edit',
  'seedream-3-0',
  'wan-2-6-t2i',
  'z-image-turbo',
  'google-nano-banana-edit',
  'google-nano-banana-pro-edit',
  'google-nano-banana-2-edit'
]

const RUNPOD_VIDEO_MODELS = [
  'infinitetalk',
  'kling-v2-1-i2v-pro',
  'kling-v2-6-motion-control',
  'kling-video-o1-r2v',
  'seedance-1-0-pro',
  'seedance-1-5-pro-i2v',
  'sora-2-i2v',
  'sora-2-pro-i2v',
  'wan-2-6-t2v',
  'wan-2-5',
  'wan-2-2-i2v-lora',
  'wan-2-2-i2v',
  'wan-2-2-t2v',
  'wan-2-1-i2v',
  'wan-2-1-t2v',
  'wan-2-6-i2v',
  'pruna-video',
  'vidu-q3-i2v',
  'vidu-q3-t2v'
]

const RUNPOD_CHAT_MODELS = [
  'ibm-granite-4-0',
  'qwen3-32b-awq'
]

// 初始化或切换渠道时，更新 API 配置
const updateFormApiConfig = () => {
  const provider = formData.provider
  const config = getProviderConfig(provider)
  formData.apiKey = modelStore.apiKeysByProvider[provider] || ''
  formData.baseUrl = modelStore.baseUrlsByProvider[provider] || config.defaultBaseUrl || ''
  formData.runpodModelKeys = localStorage.getItem('runpod-model-api-keys') || ''
}

// Watch prop changes | 监听属性变化
watch(() => props.show, (val) => {
  showModal.value = val
  if (val) {
    formData.provider = modelStore.currentProvider
    updateFormApiConfig()
  }
})

// 监听渠道变化，更新表单中的 API 配置
watch(() => formData.provider, () => {
  updateFormApiConfig()
})

// Watch modal changes | 监听弹窗变化
watch(showModal, (val) => {
  emit('update:show', val)
})

// Handle add models | 处理添加模型
const handleAddChatModel = () => {
  if (newChatModel.value.trim()) {
    modelStore.addCustomChatModel(newChatModel.value.trim())
    newChatModel.value = ''
  }
}

const handleAddImageModel = () => {
  if (newImageModel.value.trim()) {
    modelStore.addCustomImageModel(newImageModel.value.trim())
    newImageModel.value = ''
  }
}

const handleAddVideoModel = () => {
  if (newVideoModel.value.trim()) {
    modelStore.addCustomVideoModel(newVideoModel.value.trim())
    newVideoModel.value = ''
  }
}

// Handle remove models | 处理删除模型
const handleRemoveChatModel = (modelKey) => {
  modelStore.removeCustomChatModel(modelKey)
}

const handleRemoveImageModel = (modelKey) => {
  modelStore.removeCustomImageModel(modelKey)
}

const handleRemoveVideoModel = (modelKey) => {
  modelStore.removeCustomVideoModel(modelKey)
}

// Handle save | 处理保存
const handleSave = () => {
  if (formData.provider) {
    modelStore.setProvider(formData.provider)
  }
  if (formData.apiKey) {
    modelStore.setApiKeyByProvider(formData.provider, formData.apiKey)
  }
  if (formData.baseUrl) {
    modelStore.setBaseUrlByProvider(formData.provider, formData.baseUrl)
  }
  if (formData.runpodModelKeys.trim()) {
    try {
      const parsed = JSON.parse(formData.runpodModelKeys)
      localStorage.setItem('runpod-model-api-keys', JSON.stringify(parsed))
    } catch (e) {
      window.$message?.error('Format JSON Key model tidak valid')
      return
    }
  } else {
    localStorage.removeItem('runpod-model-api-keys')
  }
  showModal.value = false
  emit('saved')
}

// Handle clear | 处理清除
const handleClear = () => {
  modelStore.clearAllApiConfigs()
  modelStore.clearCustomModels()
  formData.apiKey = ''
  formData.baseUrl = ''
  formData.runpodModelKeys = ''
  localStorage.removeItem('runpod-model-api-keys')
}

const handleSyncRunpodModels = () => {
  let added = 0

  for (const model of RUNPOD_IMAGE_MODELS) {
    if (modelStore.addCustomImageModelByProvider(model, 'runpodImage')) {
      added += 1
    }
  }
  for (const model of RUNPOD_VIDEO_MODELS) {
    if (modelStore.addCustomVideoModelByProvider(model, 'runpodImage')) {
      added += 1
    }
  }
  for (const model of RUNPOD_CHAT_MODELS) {
    if (modelStore.addCustomChatModelByProvider(model, 'runpodChat')) {
      added += 1
    }
  }

  if (added > 0) {
    window.$message?.success(`Berhasil sinkron ${added} model Runpod`)
  } else {
    window.$message?.info('Daftar model Runpod sudah tersinkron')
  }
}
</script>

<style scoped>
.endpoint-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--bg-secondary, #f5f5f5);
  border-radius: 6px;
}

.endpoint-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.endpoint-label {
  font-size: 13px;
  color: var(--text-secondary, #666);
  min-width: 70px;
}

.endpoint-tag {
  font-family: monospace;
  font-size: 12px;
}

.model-config-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.model-group {
  padding: 12px;
  background: var(--bg-secondary, #f5f5f5);
  border-radius: 8px;
}

.model-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.model-group-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #333);
}

.model-input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.model-input-row .n-input {
  flex: 1;
}

.model-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
</style>
