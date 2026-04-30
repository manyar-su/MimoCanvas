import workflowCover1 from '@/assets/workflow01.jpeg'
import workflowCover2 from '@/assets/workflow02.jpeg'
import product01 from '@/assets/product01.jpg'
import scene01 from '@/assets/scene01.jpeg'
import shot01 from '@/assets/shot01.jpeg'

export const MULTI_ANGLE_PROMPTS = {
  front: {
    label: 'Tampak depan',
    english: 'Front View',
    prompt: (character) => `Gunakan gambar referensi yang terhubung untuk membuat storyboard empat panel dari karakter yang sama.

Setiap panel harus menampilkan sudut pandang depan dengan variasi jarak kamera:
1. Long shot
2. Medium shot
3. Close up
4. Extreme close up

Pastikan wajah, kostum, proporsi tubuh, warna, dan suasana tetap konsisten dengan referensi. Pertahankan rasio gambar yang sama dengan referensi. Tulis label sudut pengambilan dalam bahasa Inggris di bawah setiap panel.

Deskripsi karakter:
${character || 'Isi detail karakter di sini.'}`
  },
  side: {
    label: 'Tampak samping',
    english: 'Side View',
    prompt: (character) => `Gunakan gambar referensi yang terhubung untuk membuat storyboard empat panel dari karakter yang sama.

Setiap panel harus menampilkan sudut pandang samping dengan variasi jarak kamera:
1. Long shot
2. Medium shot
3. Close up
4. Extreme close up

Pastikan bentuk wajah, rambut, kostum, proporsi, dan pencahayaan tetap konsisten dengan referensi. Pertahankan rasio gambar yang sama dengan referensi. Tulis label sudut pengambilan dalam bahasa Inggris di bawah setiap panel.

Deskripsi karakter:
${character || 'Isi detail karakter di sini.'}`
  },
  back: {
    label: 'Tampak belakang',
    english: 'Back View',
    prompt: (character) => `Gunakan gambar referensi yang terhubung untuk membuat storyboard empat panel dari karakter yang sama.

Setiap panel harus menampilkan sudut pandang belakang dengan variasi jarak kamera:
1. Long shot
2. Medium shot
3. Close up
4. Extreme close up

Pastikan siluet, kostum, proporsi, dan suasana tetap konsisten dengan referensi. Pertahankan rasio gambar yang sama dengan referensi. Tulis label sudut pengambilan dalam bahasa Inggris di bawah setiap panel.

Deskripsi karakter:
${character || 'Isi detail karakter di sini.'}`
  },
  top: {
    label: 'Tampak atas',
    english: "Bird's Eye View",
    prompt: (character) => `Gunakan gambar referensi yang terhubung untuk membuat storyboard empat panel dari karakter yang sama.

Setiap panel harus menampilkan sudut pandang atas dengan variasi jarak kamera:
1. Long shot
2. Medium shot
3. Close up
4. Extreme close up

Pastikan pose, kostum, warna, dan lingkungan tetap konsisten dengan referensi. Pertahankan rasio gambar yang sama dengan referensi. Tulis label sudut pengambilan dalam bahasa Inggris di bawah setiap panel.

Deskripsi karakter:
${character || 'Isi detail karakter di sini.'}`
  }
}

export const WORKFLOW_TEMPLATES = [
  {
    id: 'multi-angle-storyboard',
    name: 'Storyboard multi-sudut',
    description: 'Membuat empat prompt storyboard karakter dari sudut depan, samping, belakang, dan atas.',
    icon: 'GridOutline',
    category: 'storyboard',
    cover: workflowCover1,
    createNodes: (startPosition) => {
      const nodeSpacing = 400
      const rowSpacing = 280
      const angles = ['front', 'side', 'back', 'top']
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`

      const characterTextId = getNodeId()
      nodes.push({
        id: characterTextId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y + rowSpacing * 1.5 },
        data: {
          content: 'Karakter utama: perempuan muda bergaya fantasi, rambut perak panjang, mantel biru tua, membawa tongkat bercahaya, ekspresi tenang dan percaya diri.',
          label: 'Deskripsi karakter'
        }
      })

      const characterConfigId = getNodeId()
      nodes.push({
        id: characterConfigId,
        type: 'imageConfig',
        position: { x: startPosition.x + nodeSpacing, y: startPosition.y + rowSpacing * 1.5 },
        data: {
          label: 'Buat karakter utama',
          model: 'wan-2-6-t2i',
          size: '2048x2048'
        }
      })

      const characterImageId = getNodeId()
      nodes.push({
        id: characterImageId,
        type: 'image',
        position: { x: startPosition.x + nodeSpacing * 2, y: startPosition.y + rowSpacing * 1.5 },
        data: {
          url: '',
          label: 'Hasil karakter utama'
        }
      })

      edges.push({
        id: `edge_${characterTextId}_${characterConfigId}`,
        source: characterTextId,
        target: characterConfigId,
        sourceHandle: 'right',
        targetHandle: 'left'
      })

      edges.push({
        id: `edge_${characterConfigId}_${characterImageId}`,
        source: characterConfigId,
        target: characterImageId,
        sourceHandle: 'right',
        targetHandle: 'left'
      })

      const angleX = startPosition.x + nodeSpacing * 3 + 100

      angles.forEach((angleKey, index) => {
        const angleConfig = MULTI_ANGLE_PROMPTS[angleKey]
        const angleY = startPosition.y + index * rowSpacing

        const textNodeId = getNodeId()
        nodes.push({
          id: textNodeId,
          type: 'text',
          position: { x: angleX, y: angleY },
          data: {
            content: angleConfig.prompt(''),
            label: `Prompt ${angleConfig.label.toLowerCase()}`
          }
        })

        const configNodeId = getNodeId()
        nodes.push({
          id: configNodeId,
          type: 'imageConfig',
          position: { x: angleX + nodeSpacing, y: angleY },
          data: {
            label: `${angleConfig.label} (${angleConfig.english})`,
            model: 'wan-2-6-t2i',
            size: '2048x2048'
          }
        })

        edges.push({
          id: `edge_${textNodeId}_${configNodeId}`,
          source: textNodeId,
          target: configNodeId,
          type: 'promptOrder',
          data: { promptOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        })

        edges.push({
          id: `edge_${characterImageId}_${configNodeId}`,
          source: characterImageId,
          target: configNodeId,
          type: 'imageOrder',
          data: { imageOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        })
      })

      return { nodes, edges }
    }
  },
  {
    id: 'product-ecommerce-full-set',
    name: 'Paket visual e-commerce produk',
    description: 'Menyusun foto model, tampak samping, tampak atas, dan ilustrasi eksploded untuk satu produk.',
    icon: 'ShoppingOutline',
    category: 'ecommerce',
    cover: workflowCover2,
    createNodes: (startPosition) => {
      const colSpacing = 500
      const rowSpacing = 350
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`

      const productInfoId = getNodeId()
      nodes.push({
        id: productInfoId,
        type: 'text',
        position: { x: startPosition.x, y: startPosition.y },
        data: {
          content: `Produk: Earbud nirkabel Soundcore P20i.

Poin utama:
- Driver 10 mm dengan bass kuat
- Bluetooth 5.3
- Total pemakaian hingga 30 jam
- Tahan cipratan air
- Dua mikrofon dengan bantuan AI untuk panggilan lebih jernih
- Tersedia pengaturan equalizer melalui aplikasi

Gaya visual yang diinginkan:
- Bersih, premium, modern
- Cocok untuk katalog marketplace
- Warna tetap setia ke produk asli`,
          label: 'Informasi produk'
        }
      })

      const productImageId = getNodeId()
      nodes.push({
        id: productImageId,
        type: 'image',
        position: { x: startPosition.x, y: startPosition.y + rowSpacing },
        data: {
          url: product01,
          label: 'Foto produk'
        }
      })

      const modelPromptId = getNodeId()
      nodes.push({
        id: modelPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y },
        data: {
          content: 'Buat foto model studio yang menampilkan produk ini sedang dipakai. Model terlihat modern, percaya diri, pencahayaan halus, latar putih bersih, komposisi fokus pada produk di telinga.',
          label: 'Prompt foto model'
        }
      })

      const sidePromptId = getNodeId()
      nodes.push({
        id: sidePromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing },
        data: {
          content: 'Buat render produk sudut samping 45 derajat. Tonjolkan bentuk bodi, detail casing, dan finishing material. Jaga bentuk produk tetap akurat dan tidak berubah.',
          label: 'Prompt tampak samping'
        }
      })

      const topPromptId = getNodeId()
      nodes.push({
        id: topPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 2 },
        data: {
          content: 'Buat render produk dari sudut atas. Perlihatkan susunan earbud dan casing dengan jelas, bersih, simetris, dan tetap menyerupai produk asli.',
          label: 'Prompt tampak atas'
        }
      })

      const explodedPromptId = getNodeId()
      nodes.push({
        id: explodedPromptId,
        type: 'text',
        position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 3 },
        data: {
          content: 'Buat ilustrasi eksploded view yang menjelaskan komponen utama earbud dan casing pengisi daya. Gunakan gaya teknis yang rapi, modern, mudah dipahami, dengan callout singkat untuk fitur inti.',
          label: 'Prompt ilustrasi eksploded'
        }
      })

      const modelConfigId = getNodeId()
      const sideConfigId = getNodeId()
      const topConfigId = getNodeId()
      const explodedConfigId = getNodeId()

      nodes.push(
        {
          id: modelConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
          data: { label: 'Buat foto model', model: 'wan-2-6-t2i', size: '2048x2048' }
        },
        {
          id: sideConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing },
          data: { label: 'Buat tampak samping', model: 'wan-2-6-t2i', size: '2048x2048' }
        },
        {
          id: topConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing * 2 },
          data: { label: 'Buat tampak atas', model: 'wan-2-6-t2i', size: '2048x2048' }
        },
        {
          id: explodedConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 2, y: startPosition.y + rowSpacing * 3 },
          data: { label: 'Buat ilustrasi eksploded', model: 'wan-2-6-t2i', size: '2048x2048' }
        }
      )

      const promptLinks = [
        [productInfoId, modelConfigId, 1],
        [modelPromptId, modelConfigId, 2],
        [productInfoId, sideConfigId, 1],
        [sidePromptId, sideConfigId, 2],
        [productInfoId, topConfigId, 1],
        [topPromptId, topConfigId, 2],
        [productInfoId, explodedConfigId, 1],
        [explodedPromptId, explodedConfigId, 2]
      ]

      promptLinks.forEach(([source, target, promptOrder]) => {
        edges.push({
          id: `edge_${source}_${target}`,
          source,
          target,
          type: 'promptOrder',
          data: { promptOrder },
          sourceHandle: 'right',
          targetHandle: 'left'
        })
      })

      ;[modelConfigId, sideConfigId, topConfigId, explodedConfigId].forEach((target) => {
        edges.push({
          id: `edge_${productImageId}_${target}`,
          source: productImageId,
          target,
          type: 'imageOrder',
          data: { imageOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        })
      })

      return { nodes, edges }
    }
  },
  {
    id: 'drama-character-design',
    name: 'Desain karakter drama pendek',
    description: 'Mengolah brief karakter menjadi prompt visual dan gambar referensi karakter.',
    icon: 'PersonOutline',
    category: 'drama',
    cover: shot01,
    createNodes: (startPosition) => {
      const colSpacing = 420
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`

      const briefId = getNodeId()
      const llmId = getNodeId()
      const configId = getNodeId()
      const resultId = getNodeId()

      nodes.push(
        {
          id: briefId,
          type: 'text',
          position: { x: startPosition.x, y: startPosition.y },
          data: {
            content: `Nama karakter: Alya
Usia: 23 tahun
Peran: tokoh utama drama romantis perkotaan
Kepribadian: tenang, sensitif, pekerja keras
Ciri visual: rambut hitam panjang, blazer krem, tote bag kulit, riasan natural
Nuansa: realistis, sinematik, emosional`,
            label: 'Brief karakter'
          }
        },
        {
          id: llmId,
          type: 'llmConfig',
          position: { x: startPosition.x + colSpacing, y: startPosition.y },
          data: {
            label: 'Susun prompt karakter',
            systemPrompt: `Anda adalah perancang prompt karakter untuk drama pendek.

Tugas:
1. Ubah brief karakter menjadi satu prompt gambar yang lengkap.
2. Jelaskan wajah, kostum, postur, ekspresi, dan suasana.
3. Gunakan bahasa Indonesia yang jelas dan siap dipakai untuk generator gambar.
4. Tambahkan arahan gaya realistis sinematik di akhir prompt.

Kembalikan hanya prompt akhir tanpa penjelasan tambahan.`,
            model: 'ibm-granite-4-0-h-small',
            outputFormat: 'text'
          }
        },
        {
          id: configId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
          data: {
            label: 'Buat referensi karakter',
            model: 'wan-2-6-t2i',
            size: '2048x2048'
          }
        },
        {
          id: resultId,
          type: 'image',
          position: { x: startPosition.x + colSpacing * 3, y: startPosition.y },
          data: {
            url: '',
            label: 'Hasil referensi karakter'
          }
        }
      )

      edges.push(
        { id: `edge_${briefId}_${llmId}`, source: briefId, target: llmId, sourceHandle: 'right', targetHandle: 'left' },
        {
          id: `edge_${llmId}_${configId}`,
          source: llmId,
          target: configId,
          type: 'promptOrder',
          data: { promptOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        },
        { id: `edge_${configId}_${resultId}`, source: configId, target: resultId, sourceHandle: 'right', targetHandle: 'left' }
      )

      return { nodes, edges }
    }
  },
  {
    id: 'drama-scene-background',
    name: 'Variasi latar adegan drama',
    description: 'Membuat latar dasar lalu menurunkannya menjadi versi senja, malam, dan hujan.',
    icon: 'ImageOutline',
    category: 'drama',
    cover: scene01,
    createNodes: (startPosition) => {
      const colSpacing = 420
      const rowSpacing = 260
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`

      const sceneDescId = getNodeId()
      const basePromptId = getNodeId()
      const baseConfigId = getNodeId()
      const baseResultId = getNodeId()
      const eveningPromptId = getNodeId()
      const nightPromptId = getNodeId()
      const rainPromptId = getNodeId()
      const eveningConfigId = getNodeId()
      const nightConfigId = getNodeId()
      const rainConfigId = getNodeId()

      nodes.push(
        {
          id: sceneDescId,
          type: 'text',
          position: { x: startPosition.x, y: startPosition.y },
          data: {
            content: `Latar utama:
- Gang sempit kota tua dengan deretan toko kecil
- Jalan basah sehabis dibersihkan
- Banyak papan nama, jendela kaca, dan kabel udara
- Kamera eye level, komposisi sinematik lebar
- Nuansa realistis seperti still frame drama`,
            label: 'Deskripsi latar'
          }
        },
        {
          id: basePromptId,
          type: 'text',
          position: { x: startPosition.x + colSpacing, y: startPosition.y },
          data: {
            content: 'Buat latar dasar yang realistis dan detail berdasarkan deskripsi. Tidak ada karakter. Fokus pada arsitektur, kedalaman ruang, dan pencahayaan siang yang netral.',
            label: 'Prompt latar dasar'
          }
        },
        {
          id: baseConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 2, y: startPosition.y },
          data: {
            label: 'Buat latar dasar',
            model: 'wan-2-6-t2i',
            size: '2560x1440'
          }
        },
        {
          id: baseResultId,
          type: 'image',
          position: { x: startPosition.x + colSpacing * 3, y: startPosition.y },
          data: {
            url: '',
            label: 'Hasil latar dasar'
          }
        },
        {
          id: eveningPromptId,
          type: 'text',
          position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing },
          data: {
            content: 'Gunakan gambar latar dasar sebagai referensi. Pertahankan komposisi, bangunan, dan detail lokasi yang sama, lalu ubah suasana menjadi senja hangat dengan langit jingga lembut dan lampu toko mulai menyala.',
            label: 'Prompt suasana senja'
          }
        },
        {
          id: nightPromptId,
          type: 'text',
          position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing * 2 },
          data: {
            content: 'Gunakan gambar latar dasar sebagai referensi. Pertahankan komposisi dan detail lokasi, lalu ubah menjadi malam hari dengan neon kota, lampu jendela, dan kontras warna biru gelap yang kuat.',
            label: 'Prompt suasana malam'
          }
        },
        {
          id: rainPromptId,
          type: 'text',
          position: { x: startPosition.x + colSpacing * 3 + 100, y: startPosition.y + rowSpacing * 3 },
          data: {
            content: 'Gunakan gambar latar dasar sebagai referensi. Pertahankan komposisi dan detail lokasi, lalu ubah menjadi cuaca hujan dengan aspal basah, pantulan cahaya, langit mendung, dan atmosfer melankolis.',
            label: 'Prompt suasana hujan'
          }
        },
        {
          id: eveningConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing },
          data: {
            label: 'Buat versi senja',
            model: 'wan-2-6-t2i',
            size: '2560x1440'
          }
        },
        {
          id: nightConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing * 2 },
          data: {
            label: 'Buat versi malam',
            model: 'wan-2-6-t2i',
            size: '2560x1440'
          }
        },
        {
          id: rainConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 4 + 100, y: startPosition.y + rowSpacing * 3 },
          data: {
            label: 'Buat versi hujan',
            model: 'wan-2-6-t2i',
            size: '2560x1440'
          }
        }
      )

      edges.push(
        {
          id: `edge_${sceneDescId}_${baseConfigId}`,
          source: sceneDescId,
          target: baseConfigId,
          type: 'promptOrder',
          data: { promptOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        },
        {
          id: `edge_${basePromptId}_${baseConfigId}`,
          source: basePromptId,
          target: baseConfigId,
          type: 'promptOrder',
          data: { promptOrder: 2 },
          sourceHandle: 'right',
          targetHandle: 'left'
        },
        { id: `edge_${baseConfigId}_${baseResultId}`, source: baseConfigId, target: baseResultId, sourceHandle: 'right', targetHandle: 'left' }
      )

      ;[
        [eveningPromptId, eveningConfigId],
        [nightPromptId, nightConfigId],
        [rainPromptId, rainConfigId]
      ].forEach(([promptId, configId]) => {
        edges.push(
          {
            id: `edge_${baseResultId}_${configId}`,
            source: baseResultId,
            target: configId,
            type: 'imageOrder',
            data: { imageOrder: 1 },
            sourceHandle: 'right',
            targetHandle: 'left'
          },
          {
            id: `edge_${promptId}_${configId}`,
            source: promptId,
            target: configId,
            type: 'promptOrder',
            data: { promptOrder: 1 },
            sourceHandle: 'right',
            targetHandle: 'left'
          }
        )
      })

      return { nodes, edges }
    }
  },
  {
    id: 'picture-book-generator',
    name: 'Generator buku cerita anak',
    description: 'Menyusun karakter, naskah, dan ilustrasi buku cerita dengan gaya visual yang konsisten.',
    icon: 'BookOutline',
    category: 'creative',
    cover: 'https://ffile.chatfire.site/image/covers/workflow03.jpeg',
    createNodes: (startPosition) => {
      const colSpacing = 420
      const rowSpacing = 280
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`

      const storyInputId = getNodeId()
      const characterLLMId = getNodeId()
      const characterConfigId = getNodeId()
      const characterImageId = getNodeId()
      const storyLLMId = getNodeId()
      const hintId = getNodeId()

      nodes.push(
        {
          id: storyInputId,
          type: 'text',
          position: { x: startPosition.x, y: startPosition.y },
          data: {
            content: `Judul buku: Petualangan Mimo si Kelinci

Tema cerita:
Keberanian, persahabatan, dan rasa ingin tahu

Tokoh utama:
1. Mimo, kelinci putih kecil dengan telinga merah muda, memakai celana overall biru, ceria dan berani.
2. Nara, rubah kecil berwarna jingga dengan syal hijau, cerdas dan setia menemani.

Garis besar cerita:
Mimo menemukan peta misterius di dekat rumah pohon. Ia mengajak Nara mengikuti petunjuk menuju harta karun. Mereka melewati sungai kecil, jembatan kayu, dan hutan berbunga sebelum menyadari bahwa harta terbesar adalah persahabatan mereka.

Gaya ilustrasi:
Cat air lembut, hangat, penuh warna, cocok untuk anak usia 3 sampai 6 tahun.`,
            label: 'Garis besar cerita'
          }
        },
        {
          id: characterLLMId,
          type: 'llmConfig',
          position: { x: startPosition.x + colSpacing, y: startPosition.y - rowSpacing },
          data: {
            label: 'Rancang prompt karakter',
            systemPrompt: `Anda adalah desainer karakter buku cerita anak.

Tugas Anda:
1. Identifikasi semua tokoh dari garis besar cerita.
2. Tulis prompt gambar terpisah untuk setiap tokoh.
3. Cantumkan ciri fisik, kostum, ekspresi, pose, dan nuansa visual.
4. Gunakan bahasa Indonesia.
5. Tutup setiap prompt dengan arahan gaya: "ilustrasi cat air buku anak, hangat, lembut, ramah anak, latar sederhana".

Format keluaran:
[Nama tokoh]
[Prompt gambar]
---`,
            model: 'ibm-granite-4-0-h-small',
            outputFormat: 'text'
          }
        },
        {
          id: characterConfigId,
          type: 'imageConfig',
          position: { x: startPosition.x + colSpacing * 2, y: startPosition.y - rowSpacing },
          data: {
            label: 'Buat referensi karakter',
            model: 'wan-2-6-t2i',
            size: '2048x2048'
          }
        },
        {
          id: characterImageId,
          type: 'image',
          position: { x: startPosition.x + colSpacing * 3, y: startPosition.y - rowSpacing },
          data: {
            url: '',
            label: 'Hasil referensi karakter'
          }
        },
        {
          id: storyLLMId,
          type: 'llmConfig',
          position: { x: startPosition.x + colSpacing, y: startPosition.y + rowSpacing * 0.5 },
          data: {
            label: 'Pisahkan cerita per halaman',
            systemPrompt: `Anda adalah penulis naskah buku cerita anak.

Pisahkan cerita menjadi 4 sampai 8 halaman.

Format keluaran wajib:
Halaman 1: [teks cerita singkat] | [prompt ilustrasi]
Halaman 2: [teks cerita singkat] | [prompt ilustrasi]

Aturan:
1. Teks tiap halaman singkat, hangat, dan mudah dipahami anak.
2. Prompt ilustrasi harus menjelaskan adegan, karakter, aksi, suasana, dan warna.
3. Gunakan bahasa Indonesia.
4. Tambahkan konsistensi gaya buku cerita cat air pada setiap prompt ilustrasi.`,
            model: 'ibm-granite-4-0-h-small',
            outputFormat: 'text'
          }
        },
        {
          id: hintId,
          type: 'text',
          position: { x: startPosition.x + colSpacing * 2.5, y: startPosition.y + rowSpacing * 0.5 },
          data: {
            content: `Langkah penggunaan:
1. Jalankan node "Rancang prompt karakter".
2. Jalankan node "Buat referensi karakter".
3. Jalankan node "Pisahkan cerita per halaman".
4. Gunakan tombol pecah di node LLM untuk membuat node cerita dan ilustrasi per halaman.
5. Hubungkan hasil referensi karakter ke node ilustrasi agar gaya tokoh tetap konsisten.`,
            label: 'Panduan penggunaan'
          }
        }
      )

      edges.push(
        { id: `edge_${storyInputId}_${characterLLMId}`, source: storyInputId, target: characterLLMId, sourceHandle: 'right', targetHandle: 'left' },
        {
          id: `edge_${characterLLMId}_${characterConfigId}`,
          source: characterLLMId,
          target: characterConfigId,
          type: 'promptOrder',
          data: { promptOrder: 1 },
          sourceHandle: 'right',
          targetHandle: 'left'
        },
        { id: `edge_${characterConfigId}_${characterImageId}`, source: characterConfigId, target: characterImageId, sourceHandle: 'right', targetHandle: 'left' },
        { id: `edge_${storyInputId}_${storyLLMId}`, source: storyInputId, target: storyLLMId, sourceHandle: 'right', targetHandle: 'left' }
      )

      return { nodes, edges }
    }
  },
  {
    id: 'ugc-influencer-avatar-to-video',
    name: 'UGC influencer (avatar ke video)',
    description: 'Alur sederhana: referensi avatar + simple prompt → avatar output → video output.',
    icon: 'VideocamOutline',
    category: 'creative',
    createNodes: (startPosition) => {
      const colSpacing = 360
      const rowSpacing = 360
      const nodes = []
      const edges = []
      let nodeIdCounter = 0
      const getNodeId = () => `workflow_node_${Date.now()}_${nodeIdCounter++}`

      const createLane = (laneIndex, laneTitle, promptText) => {
        const laneY = startPosition.y + laneIndex * rowSpacing

        const noteId = getNodeId()
        const refId = getNodeId()
        const avatarPromptId = getNodeId()
        const avatarConfigId = getNodeId()
        const avatarOutputId = getNodeId()
        const videoPromptId = getNodeId()
        const videoConfigId = getNodeId()
        const videoOutputId = getNodeId()

        nodes.push(
          {
            id: noteId,
            type: 'text',
            position: { x: startPosition.x, y: laneY - 130 },
            data: {
              label: `Note ${laneTitle}`,
              content: `Langkah ${laneTitle}:\n1) Upload referensi wajah\n2) Generate avatar\n3) Generate video UGC` 
            }
          },
          {
            id: refId,
            type: 'avatar',
            position: { x: startPosition.x, y: laneY },
            data: {
              label: `Reference image ${laneTitle}`,
              url: ''
            }
          },
          {
            id: avatarPromptId,
            type: 'simplePrompt',
            position: { x: startPosition.x + colSpacing, y: laneY - 130 },
            data: {
              label: `Simple prompt avatar ${laneTitle}`,
              content: 'Buat avatar influencer wanita usia 20-an, close-up selfie, natural light, wajah bersih, detail kulit natural, ekspresi percaya diri, look realistis, rasio portrait 9:16.'
            }
          },
          {
            id: avatarConfigId,
            type: 'imageConfig',
            position: { x: startPosition.x + colSpacing, y: laneY },
            data: {
              label: `Avatar clone ${laneTitle}`,
              model: 'google-nano-banana-2-edit',
              size: '9x16'
            }
          },
          {
            id: avatarOutputId,
            type: 'avatar',
            position: { x: startPosition.x + colSpacing * 2, y: laneY },
            data: {
              label: `Avatar output ${laneTitle}`,
              url: ''
            }
          },
          {
            id: videoPromptId,
            type: 'simplePrompt',
            position: { x: startPosition.x + colSpacing * 2, y: laneY - 130 },
            data: {
              label: `Simple prompt video ${laneTitle}`,
              content: promptText
            }
          },
          {
            id: videoConfigId,
            type: 'videoConfig',
            position: { x: startPosition.x + colSpacing * 3, y: laneY },
            data: {
              label: `Video output ${laneTitle}`,
              model: 'vidu-q3-i2v',
              ratio: '9:16',
              dur: 5,
              resolution: '1080p'
            }
          },
          {
            id: videoOutputId,
            type: 'video',
            position: { x: startPosition.x + colSpacing * 4, y: laneY },
            data: {
              label: `Video result ${laneTitle}`,
              url: ''
            }
          }
        )

        edges.push(
          {
            id: `edge_${avatarPromptId}_${avatarConfigId}`,
            source: avatarPromptId,
            target: avatarConfigId,
            type: 'promptOrder',
            data: { promptOrder: 1 },
            sourceHandle: 'right',
            targetHandle: 'left-top'
          },
          {
            id: `edge_${refId}_${avatarConfigId}`,
            source: refId,
            target: avatarConfigId,
            type: 'imageOrder',
            data: { imageOrder: 1 },
            sourceHandle: 'right',
            targetHandle: 'left-bottom'
          },
          { id: `edge_${avatarConfigId}_${avatarOutputId}`, source: avatarConfigId, target: avatarOutputId, sourceHandle: 'right', targetHandle: 'left' },
          {
            id: `edge_${videoPromptId}_${videoConfigId}`,
            source: videoPromptId,
            target: videoConfigId,
            type: 'promptOrder',
            data: { promptOrder: 1 },
            sourceHandle: 'right',
            targetHandle: 'left-top'
          },
          {
            id: `edge_${avatarOutputId}_${videoConfigId}`,
            source: avatarOutputId,
            target: videoConfigId,
            type: 'imageRole',
            data: { imageRole: 'first_frame_image' },
            sourceHandle: 'right',
            targetHandle: 'left-bottom'
          },
          { id: `edge_${videoConfigId}_${videoOutputId}`, source: videoConfigId, target: videoOutputId, sourceHandle: 'right', targetHandle: 'left' }
        )
      }

      createLane(
        0,
        'A',
        'Perempuan berbicara ke kamera selfie, natural, ekspresif, gaya UGC TikTok, bahasa Indonesia, tanpa subtitle, durasi pendek, gerakan kepala dan bibir natural.'
      )

      createLane(
        1,
        'B',
        'Perempuan menatap kamera dengan hangat, menyampaikan ajakan singkat untuk live, gaya influencer UGC, portrait 9:16, tanpa teks overlay, kualitas video bersih.'
      )

      return { nodes, edges }
    }
  }
]

export const getWorkflowById = (id) => {
  return WORKFLOW_TEMPLATES.find((workflow) => workflow.id === id)
}

export const getWorkflowsByCategory = (category) => {
  return WORKFLOW_TEMPLATES.filter((workflow) => workflow.category === category)
}

export default WORKFLOW_TEMPLATES
