import { create } from 'zustand';

const useAppStore = create((set) => ({
  // User progress tracking
  userProgress: {
    completedTopics: [],
    currentTopic: null,
    weakAreas: [],
    studyStreak: 0,
    totalStudyTime: 0,
    lastStudyDate: null,
  },

  // Learning state
  learningState: {
    currentCategory: null,
    currentTopic: null,
    currentSubtopic: null,
    studyMode: 'learn', // learn, practice, mock, debug
    difficulty: 'medium',
  },

  // Spaced repetition
  spacedRepetition: {
    reviewQueue: [],
    nextReviewDates: {},
    masteryLevels: {},
    lastReviewSession: null,
  },

  // Mock interview state
  mockInterview: {
    currentQuestion: null,
    answers: [],
    feedback: [],
    score: 0,
    isCompleted: false,
    category: null,
    difficulty: null,
  },

  // Settings
  settings: {
    darkMode: false,
    animationsEnabled: true,
    soundEnabled: false,
    dailyGoal: 30, // minutes
    notificationsEnabled: true,
    preferredDifficulty: 'medium',
  },

  // Actions
  setUserProgress: (progress) => set({ userProgress: progress }),
  updateCompletedTopics: (topicId) => set((state) => ({
    userProgress: {
      ...state.userProgress,
      completedTopics: [...state.userProgress.completedTopics, topicId],
    },
  })),
  
  setLearningState: (state) => set({ learningState: state }),
  
  addToReviewQueue: (topicId) => set((state) => ({
    spacedRepetition: {
      ...state.spacedRepetition,
      reviewQueue: [...state.spacedRepetition.reviewQueue, topicId],
    },
  })),
  
  updateMasteryLevel: (topicId, level) => set((state) => ({
    spacedRepetition: {
      ...state.spacedRepetition,
      masteryLevels: {
        ...state.spacedRepetition.masteryLevels,
        [topicId]: level,
      },
    },
  })),
  
  setMockInterview: (interview) => set({ mockInterview: interview }),
  
  updateSettings: (settings) => set((state) => ({
    settings: { ...state.settings, ...settings },
  })),

  // Analytics
  getStudyStats: () => {
    const state = useAppStore.getState();
    return {
      totalCompleted: state.userProgress.completedTopics.length,
      currentStreak: state.userProgress.studyStreak,
      totalStudyTime: state.userProgress.totalStudyTime,
      weakAreasCount: state.userProgress.weakAreas.length,
      masteryAverage: Object.values(state.spacedRepetition.masteryLevels).reduce((a, b) => a + b, 0) / Object.keys(state.spacedRepetition.masteryLevels).length || 0,
    };
  },

  // Reset functions
  resetProgress: () => set({
    userProgress: {
      completedTopics: [],
      currentTopic: null,
      weakAreas: [],
      studyStreak: 0,
      totalStudyTime: 0,
      lastStudyDate: null,
    },
    spacedRepetition: {
      reviewQueue: [],
      nextReviewDates: {},
      masteryLevels: {},
      lastReviewSession: null,
    },
  }),
}));

export default useAppStore;
