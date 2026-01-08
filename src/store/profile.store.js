import { create } from 'zustand';

export const useProfileStore = create(set => ({
  // profile data
  profile: null, // null = not created yet

  // UI state
  mode: 'create', // 'create' | 'view' | 'edit'
  isDirty: false,
  showConfirmModal: false,

  // actions
  createProfile: data =>
    set({
      profile: data,
      mode: 'view',
      isDirty: false,
    }),

  updateProfile: data =>
    set({
      profile: data,
      mode: 'view',
      isDirty: false,
    }),

  setMode: mode => set({ mode }),
  setDirty: value => set({ isDirty: value }),

  openConfirmModal: () => set({ showConfirmModal: true }),
  closeConfirmModal: () => set({ showConfirmModal: false }),
}));
