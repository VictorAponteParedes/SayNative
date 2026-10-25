import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Image as ImageIcon, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, AppBottomSheet, AppButton } from '@/components';

export interface ChangePhotoBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onChooseFromGallery: () => void;
  onTakeSelfie: () => void;
}

export const ChangePhotoBottomSheet: React.FC<ChangePhotoBottomSheetProps> = ({
  visible,
  onClose,
  onChooseFromGallery,
  onTakeSelfie,
}) => {
  const { t } = useTranslation('profile');
  const [pendingAction, setPendingAction] = useState<'gallery' | 'camera' | null>(null);

  const handleChooseFromGallery = () => {
    setPendingAction('gallery');
    onClose();
  };

  const handleTakeSelfie = () => {
    setPendingAction('camera');
    onClose();
  };

  const handleDismiss = () => {
    if (pendingAction === 'gallery') {
      setPendingAction(null);
      setTimeout(() => {
        onChooseFromGallery();
      }, 120);
    } else if (pendingAction === 'camera') {
      setPendingAction(null);
      setTimeout(() => {
        onTakeSelfie();
      }, 120);
    }
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      onDismiss={handleDismiss}
      title={t('changePhotoSheet.title')}
      subtitle={t('changePhotoSheet.subtitle')}
    >
      <View style={styles.container}>
        {/* Opción 1: Elegir de la galería */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleChooseFromGallery}
          style={styles.optionRow}
        >
          <View style={[styles.iconWrapper, { backgroundColor: colors.primaryBgSubtle }]}>
            <ImageIcon size={22} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.optionTitle}>
              {t('changePhotoSheet.chooseGallery')}
            </AppText>
            <AppText variant="caption" style={styles.optionSubtitle}>
              {t('changePhotoSheet.chooseGallerySubtitle')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Opción 2: Tomarse una selfie */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleTakeSelfie}
          style={styles.optionRow}
        >
          <View style={[styles.iconWrapper, { backgroundColor: colors.actionLight }]}>
            <Camera size={22} color={colors.actionDark} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.optionTitle}>
              {t('changePhotoSheet.takeSelfie')}
            </AppText>
            <AppText variant="caption" style={styles.optionSubtitle}>
              {t('changePhotoSheet.takeSelfieSubtitle')}
            </AppText>
          </View>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Botón Cancelar */}
        <View style={styles.cancelButtonContainer}>
          <AppButton
            variant="secondary"
            title={t('changePhotoSheet.cancel')}
            onPress={onClose}
          />
        </View>
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.sm + 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textColumn: {
    flex: 1,
  },
  optionTitle: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: 2,
  },
  optionSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  cancelButtonContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
  },
});

export default ChangePhotoBottomSheet;
