import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText } from '@/components';
import {
  HistoryHeader,
  HistoryBalanceSummaryCard,
  HistoryFilterTabs,
  TransactionItemCard,
  HistorySupportFooter,
} from '../../components/history';
import { useCoinsHistory } from '../../hooks/useCoinsHistory';
import { styles } from './styles';

export const CoinsHistoryScreen: React.FC = () => {
  const { t } = useTranslation('coins');
  const {
    activeFilter,
    setActiveFilter,
    currentBalance,
    totalEarned,
    totalConsumed,
    sections,
  } = useCoinsHistory();

  return (
    <SafeAreaContainer edges={['top', 'bottom']} style={styles.container}>
      <HistoryHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta de Resumen de Saldo */}
        <HistoryBalanceSummaryCard
          currentBalance={currentBalance}
          totalEarned={totalEarned}
          totalConsumed={totalConsumed}
        />

        {/* Pestañas de Filtros */}
        <HistoryFilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />

        {/* Secciones de Transacciones */}
        {sections.map((group) => (
          <View key={group.sectionKey}>
            <View style={styles.sectionHeader}>
              <AppText variant="caption" style={styles.sectionTitle}>
                {t(`history.sections.${group.sectionKey}`)}
              </AppText>
              <AppText variant="caption" style={styles.movementsCount}>
                {t('history.sections.movementsCount', {
                  count: group.data.length,
                })}
              </AppText>
            </View>

            <View style={styles.sectionList}>
              {group.data.map((transaction) => (
                <TransactionItemCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </View>
          </View>
        ))}

        {sections.length === 0 && (
          <View style={styles.emptyContainer}>
            <AppText variant="body" style={styles.emptyText}>
              {t('history.filters.empty')}
            </AppText>
          </View>
        )}

        {/* Pie con Soporte y Certificado SSL */}
        <HistorySupportFooter />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default CoinsHistoryScreen;
