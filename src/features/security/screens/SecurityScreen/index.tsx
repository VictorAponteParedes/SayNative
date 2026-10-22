import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaContainer } from '../../../../components';
import {
  SecurityHeader,
  SafeCommunityBanner,
  PrivacySettingsSection,
  BlockedUsersSection,
  ModerationReportsSection,
} from '../../components';
import { useSecuritySettings } from '../../hooks/useSecuritySettings';
import { styles } from './styles';

export const SecurityScreen: React.FC = () => {
  const {
    privacy,
    blockedUsers,
    handleTogglePrivacy,
    handleUnblockUser,
    handleReadGuidelines,
    handleViewReportsStatus,
    handleDeleteAccount,
  } = useSecuritySettings();

  return (
    <SafeAreaContainer edges={['top', 'bottom']} style={styles.container}>
      {/* Cabecera con flechita atrás y título */}
      <SecurityHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Comunidad Segura / SayShield */}
        <SafeCommunityBanner onPressGuidelines={handleReadGuidelines} />

        {/* Ajustes de Privacidad con Protección Activa */}
        <PrivacySettingsSection
          settings={privacy}
          onToggle={handleTogglePrivacy}
        />

        {/* Sección de Usuarios Bloqueados */}
        <BlockedUsersSection
          blockedUsers={blockedUsers}
          onUnblock={handleUnblockUser}
        />

        {/* Moderación, Reportes y Zona de Peligro */}
        <ModerationReportsSection
          onPressReportsStatus={handleViewReportsStatus}
          onDeleteAccount={handleDeleteAccount}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default SecurityScreen;
