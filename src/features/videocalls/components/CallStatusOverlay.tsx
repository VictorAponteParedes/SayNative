import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, borderRadius } from '@/theme';
import { AppText } from '@/components';
import { CallStatus } from '../types';

export interface CallStatusOverlayProps {
  status: CallStatus;
  peerName: string;
}

export const CallStatusOverlay: React.FC<CallStatusOverlayProps> = ({
  status,
  peerName,
}) => {
  const { t } = useTranslation('calls');

  if (status === 'connected') return null;

  const getStatusText = (): string => {
    switch (status) {
      case 'calling':
      case 'ringing':
        return t('lobby.ringing', { name: peerName });
      case 'connecting':
        return t('active.connecting');
      case 'reconnecting':
        return t('active.reconnecting');
      case 'busy':
        return t('errors.userBusy');
      case 'rejected':
        return t('errors.callRejected', { name: peerName });
      case 'ended':
        return t('summary.title');
      default:
        return '';
    }
  };

  const text = getStatusText();
  if (!text) return null;

  const isLoading = status === 'calling' || status === 'ringing' || status === 'connecting' || status === 'reconnecting';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {isLoading && <ActivityIndicator color={colors.primary} style={styles.loader} />}
        <AppText variant="bodyMedium" color={colors.white} style={styles.text}>
          {text}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    zIndex: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loader: {
    marginRight: 4,
  },
  text: {
    fontWeight: '600',
  },
});

export default CallStatusOverlay;
