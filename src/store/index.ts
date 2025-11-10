// Store para gerenciamento de estado global usando Zustand

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Language } from '@/types'
import { APP_CONFIG } from '@/config'

interface AppState {
  language: Language
  setLanguage: (lang: Language) => void
  user: {
    id?: string
    name?: string
    email?: string
    picture?: string
  } | null
  setUser: (user: AppState['user']) => void
  favoritePetitions: string[]
  toggleFavorite: (petitionId: string) => void
  recentPetitions: string[]
  addRecentPetition: (petitionId: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: APP_CONFIG.defaultLanguage,
      setLanguage: (lang) => set({ language: lang }),
      user: null,
      setUser: (user) => set({ user }),
      favoritePetitions: [],
      toggleFavorite: (petitionId) =>
        set((state) => ({
          favoritePetitions: state.favoritePetitions.includes(petitionId)
            ? state.favoritePetitions.filter((id) => id !== petitionId)
            : [...state.favoritePetitions, petitionId],
        })),
      recentPetitions: [],
      addRecentPetition: (petitionId) =>
        set((state) => ({
          recentPetitions: [
            petitionId,
            ...state.recentPetitions.filter((id) => id !== petitionId),
          ].slice(0, 10),
        })),
    }),
    {
      name: 'movaa-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        language: state.language,
        favoritePetitions: state.favoritePetitions,
        recentPetitions: state.recentPetitions,
      }),
    }
  )
)
