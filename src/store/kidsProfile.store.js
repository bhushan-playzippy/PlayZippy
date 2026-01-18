import { create } from 'zustand';

export const useKidsProfileStore = create(set => ({
  kidProfile: null,
  editMode: false,

  contentSafety: [],
  restrictedWords: ['Adult Content', 'Amazing experience'],

  setContentSafety: items => set({ contentSafety: items }),
  setRestrictedWords: words => set({ restrictedWords: words }),

  parenting: [],
  setParenting: items => set({ parenting: items }),

  setKidProfile: profile => set({ kidProfile: profile }),
  setEditMode: value => set({ editMode: value }),
}));
