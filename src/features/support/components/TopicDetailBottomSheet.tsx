import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { AppText, AppBottomSheet, Toast } from '@/components';

export interface TopicArticle {
  id: string;
  title: string;
  description: string;
}

export interface TopicDetailBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  topicId: string | null;
}

const TOPIC_DETAILS: Record<
  string,
  { title: string; subtitle: string; articles: TopicArticle[] }
> = {
  coins_payments: {
    title: 'Monedas y Pagos',
    subtitle: 'Todo sobre recargas, cobros e historial',
    articles: [
      {
        id: '1',
        title: '¿Cómo restaurar compras anteriores?',
        description:
          'Desde la pantalla de Monedas, ve al pie legal y pulsa "Restaurar compras" para sincronizar tus transacciones de Apple o Google.',
      },
      {
        id: '2',
        title: 'Tarifa y cobro por minuto en videollamada',
        description:
          'Las llamadas descuentan 10 monedas por minuto automáticamente. Si dura menos de 15 segundos no se efectúa ningún cobro.',
      },
      {
        id: '3',
        title: 'Límite de monedas gratis diarias',
        description:
          'Puedes ver hasta 5 anuncios recompensados al día para acumular un total de 25 monedas sin costo adicional.',
      },
    ],
  },
  video_issues: {
    title: 'Problemas con Videollamadas',
    subtitle: 'Solución a permisos, cámara y audio',
    articles: [
      {
        id: '1',
        title: 'Permisos de cámara y micrófono',
        description:
          'Ve a los ajustes de tu teléfono > Aplicaciones > SayNative y asegúrate de otorgar acceso permanente al micrófono y cámara.',
      },
      {
        id: '2',
        title: 'Retraso de audio o ecos en sala',
        description:
          'Recomendamos usar auriculares para evitar retroalimentación acústica y conectarte a una red Wi-Fi de al menos 5 Mbps.',
      },
      {
        id: '3',
        title: 'Protección Anti-Shock activa',
        description:
          'Si la cámara de tu compañero aparece borrosa los primeros 5 segundos, es la protección anti-shock configurada en Seguridad.',
      },
    ],
  },
  account_languages: {
    title: 'Mi Cuenta e Idiomas',
    subtitle: 'Gestión de perfil y preferencias nativas',
    articles: [
      {
        id: '1',
        title: '¿Cómo cambiar el idioma de la aplicación?',
        description:
          'Ve a tu Perfil > Cuenta y Preferencias > Idioma de la aplicación para seleccionar entre Español, Inglés, Portugués, Francés, Japonés o Chino.',
      },
      {
        id: '2',
        title: 'Activar el Modo Enseñar',
        description:
          'Activa el interruptor en la sección "Modo Enseñar" de tu perfil para empezar a recibir llamadas de estudiantes y ganar monedas.',
      },
      {
        id: '3',
        title: 'Actualizar nivel de idioma o idioma de práctica',
        description:
          'Pulsa el lápiz en la tarjeta de presentación de tu perfil o selecciona "Datos Personales" para ajustar tus idiomas.',
      },
    ],
  },
};

export const TopicDetailBottomSheet: React.FC<TopicDetailBottomSheetProps> = ({
  visible,
  onClose,
  topicId,
}) => {
  if (!topicId || !TOPIC_DETAILS[topicId]) {
    return null;
  }

  const topicData = TOPIC_DETAILS[topicId];

  const handlePressArticle = (article: TopicArticle) => {
    Toast.success('Artículo de ayuda', article.title);
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={topicData.title}
      subtitle={topicData.subtitle}
    >
      <View style={styles.container}>
        {topicData.articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            activeOpacity={0.7}
            onPress={() => handlePressArticle(article)}
            style={styles.articleCard}
          >
            <View style={styles.iconCircle}>
              <CheckCircle2 size={18} color={colors.primary} />
            </View>
            <View style={styles.textColumn}>
              <AppText variant="body" style={styles.articleTitle}>
                {article.title}
              </AppText>
              <AppText variant="caption" style={styles.articleDesc}>
                {article.description}
              </AppText>
            </View>
            <ChevronRight size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryBgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textColumn: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  articleDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
});
