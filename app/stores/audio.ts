/* eslint-disable @typescript-eslint/no-explicit-any */
export type SoundName = 'correct' | 'wrong' | 'passed' | 'failed'

export const useAudioStore = defineStore('audio', () => {
  const masterVolume = ref(0.8)

  const audioUrl = '/sounds/sprite_assets.mp3'

  const spriteMap: Record<SoundName, [number, number]> = {
    correct: [0, 1593.4693877551022],
    failed: [3000, 2040],
    passed: [7000, 2063.673469387755],
    wrong: [11000, 1018.7755102040815]
  }

  const { play: playSprite } = useSound(audioUrl, {
    sprite: spriteMap,
    volume: masterVolume,
    html5: false,
    preload: true,
    format: ['mp3', 'ogg']
  })

  const play = (soundName: SoundName) => {
    if (import.meta.client) {
      if (spriteMap[soundName]) {
        playSprite({ id: soundName as any })
      } else {
        console.warn(`[AudioStore] SFX "${soundName}" tidak ditemukan di sprite.`)
      }
    }
  }

  return {
    masterVolume,
    play
  }
})
