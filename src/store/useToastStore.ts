import { create } from 'zustand';

export type ToastType = 'success' | 'warning' | 'error';

export interface ToastOptions {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastState {
  currentToast: ToastItem | null;
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  currentToast: null,
  showToast: (options) => {
    const id = Date.now().toString();
    set({
      currentToast: {
        ...options,
        id,
        duration: options.duration ?? 3500,
      },
    });
  },
  hideToast: () => set({ currentToast: null }),
}));

export const Toast = {
  success: (title: string, message?: string, duration?: number) => {
    useToastStore.getState().showToast({
      type: 'success',
      title,
      message,
      duration,
    });
  },
  warning: (title: string, message?: string, duration?: number) => {
    useToastStore.getState().showToast({
      type: 'warning',
      title,
      message,
      duration,
    });
  },
  error: (title: string, message?: string, duration?: number) => {
    useToastStore.getState().showToast({
      type: 'error',
      title,
      message,
      duration,
    });
  },
  hide: () => {
    useToastStore.getState().hideToast();
  },
};
