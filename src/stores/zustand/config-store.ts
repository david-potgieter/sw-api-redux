import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ConfigTheme = 'light' | 'dark'

interface Config {
  theme: ConfigTheme
}

interface ConfigStore {
  config: Config
  setTheme: (theme: ConfigTheme) => void
}

export const useAppConfig = create<ConfigStore>()(
  persist(
    (set) => ({
      config: { theme: 'light' },
      setTheme: (theme) =>
        set((state) => ({ config: { ...state.config, theme } })),
    }),
    {
      name: 'app-config-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
