import { create } from 'zustand';

export interface ModalOptions {
  title?: string;
  message?: string;
  propInfo?: boolean;
  isInfo?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  loading?: boolean;
  dismissable?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalState {
  currentModal: ModalOptions | null;
  visible: boolean;
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  currentModal: null,
  visible: false,
  showModal: (options) => {
    set({
      currentModal: options,
      visible: true,
    });
  },
  hideModal: () => {
    set({ visible: false, currentModal: null });
  },
}));

export const AppAlert = {
  /**
   * Muestra un modal informativo con un único botón (OK).
   */
  info: (title: string, message?: string, onConfirm?: () => void) => {
    useModalStore.getState().showModal({
      title,
      message,
      propInfo: true,
      onConfirm,
    });
  },

  /**
   * Muestra un modal de confirmación con dos botones (Cancelar y Confirmar/Aceptar).
   */
  confirm: (options: {
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: string;
    cancelColor?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => {
    useModalStore.getState().showModal({
      ...options,
      propInfo: false,
    });
  },

  /**
   * Cierra manualmente el modal activo.
   */
  hide: () => {
    useModalStore.getState().hideModal();
  },
};
