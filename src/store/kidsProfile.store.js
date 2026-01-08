import { create } from 'zustand';

export const useKidsProfileStore = create(set => ({
  kidProfile: null,
  editMode: false,

  guardrails: [],
  learningThemes: [],

  setKidProfile: profile => set({ kidProfile: profile }),

  setEditMode: value => set({ editMode: value }),

  setGuardrails: list => set({ guardrails: list }),

  setListLearning: list => set({ learningThemes: list }),
}));
