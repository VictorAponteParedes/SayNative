import React from 'react';
import { useModalStore } from '@/store/useModalStore';
import { ConfirmModal } from './ConfirmModal';

export const ConfirmModalContainer: React.FC = () => {
  const { currentModal, visible, hideModal } = useModalStore();

  if (!currentModal && !visible) {
    return null;
  }

  const handleConfirm = () => {
    const callback = currentModal?.onConfirm;
    hideModal();
    callback?.();
  };

  const handleCancel = () => {
    const callback = currentModal?.onCancel;
    hideModal();
    callback?.();
  };

  return (
    <ConfirmModal
      visible={visible}
      title={currentModal?.title}
      message={currentModal?.message}
      propInfo={currentModal?.propInfo ?? currentModal?.isInfo}
      confirmText={currentModal?.confirmText}
      cancelText={currentModal?.cancelText}
      confirmColor={currentModal?.confirmColor}
      cancelColor={currentModal?.cancelColor}
      loading={currentModal?.loading}
      dismissable={currentModal?.dismissable ?? true}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={hideModal}
    />
  );
};
