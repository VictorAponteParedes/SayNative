import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaContainer } from '@/components';
import {
  SupportHeader,
  SupportHeroCard,
  FeaturedTopicsSection,
  FaqAccordionSection,
  SupportContactCard,
  ContactSupportBottomSheet,
  TopicDetailBottomSheet,
} from '../../components';
import { useSupport } from '../../hooks/useSupport';
import { styles } from './styles';

export const SupportScreen: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleSelectCategory,
    activeTopicId,
    handleOpenTopic,
    handleCloseTopic,
    isContactSheetOpen,
    handleOpenContact,
    handleCloseContact,
    handleBack,
  } = useSupport();

  return (
    <SafeAreaContainer edges={['top']} style={styles.container}>
      {/* Encabezado con botón Volver */}
      <SupportHeader onBack={handleBack} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta Hero: "¿En qué podemos ayudarte hoy?", buscador y categorías */}
        <SupportHeroCard
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Sección: Temas destacados (3 categorías) */}
        <FeaturedTopicsSection onPressTopic={handleOpenTopic} />

        {/* Sección: Preguntas Frecuentes (Acordeón expandible) */}
        <FaqAccordionSection />

        {/* Tarjeta de Contacto con Soporte Humano */}
        <SupportContactCard onPressContact={handleOpenContact} />
      </ScrollView>

      {/* BottomSheet de detalle de tema destacado */}
      <TopicDetailBottomSheet
        visible={!!activeTopicId}
        onClose={handleCloseTopic}
        topicId={activeTopicId}
      />

      {/* BottomSheet para enviar mensaje a soporte */}
      <ContactSupportBottomSheet
        visible={isContactSheetOpen}
        onClose={handleCloseContact}
      />
    </SafeAreaContainer>
  );
};

export default SupportScreen;
