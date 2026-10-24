import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from './AppText';
import { AppBottomSheet } from './AppBottomSheet';
import { AppButton } from './AppButton';

export interface DatePickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  value?: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  title?: string;
  maxDate?: Date;
  minDate?: Date;
}

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const WEEK_DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export const DatePickerBottomSheet: React.FC<DatePickerBottomSheetProps> = ({
  visible,
  onClose,
  value,
  onSelectDate,
  title = 'Fecha de nacimiento',
  maxDate = new Date(),
  minDate = new Date(1920, 0, 1),
}) => {
  // Inicializar año y mes a partir del value o por defecto (hace 20 años para birthDate)
  const initialDate = useMemo(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const parts = value.split('-').map(Number);
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    const d = new Date();
    d.setFullYear(d.getFullYear() - 22);
    return d;
  }, [value]);

  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(
    value ? initialDate.getDate() : null
  );
  const [isYearPickerOpen, setIsYearPickerOpen] = useState<boolean>(false);

  // Lista de años disponibles (desde maxDate año hacia minDate año)
  const years = useMemo(() => {
    const start = maxDate.getFullYear();
    const end = minDate.getFullYear();
    const list: number[] = [];
    for (let y = start; y >= end; y--) {
      list.push(y);
    }
    return list;
  }, [maxDate, minDate]);

  // Días del mes actual
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    const maxYear = maxDate.getFullYear();
    const maxMonth = maxDate.getMonth();
    if (currentYear > maxYear || (currentYear === maxYear && currentMonth >= maxMonth)) {
      return;
    }

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    if (selectedDate > maxDate || selectedDate < minDate) {
      return;
    }
    setSelectedDay(day);
  };

  const handleConfirm = () => {
    if (!selectedDay) return;
    const y = currentYear;
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(selectedDay).padStart(2, '0');
    const formatted = `${y}-${m}-${d}`;
    onSelectDate(formatted);
    onClose();
  };

  return (
    <AppBottomSheet visible={visible} onClose={onClose} title={title}>
      <View style={styles.container}>
        {/* Selector de Mes y Año */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsYearPickerOpen((prev) => !prev)}
            style={styles.monthYearSelector}
          >
            <AppText variant="h3" style={styles.monthYearText}>
              {MONTH_NAMES[currentMonth]} {currentYear}
            </AppText>
            <ChevronDown
              size={18}
              color={colors.primary}
              style={{
                transform: [{ rotate: isYearPickerOpen ? '180deg' : '0deg' }],
              }}
            />
          </TouchableOpacity>

          {!isYearPickerOpen && (
            <View style={styles.arrowsRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handlePrevMonth}
                style={styles.navArrow}
              >
                <ChevronLeft size={20} color={colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleNextMonth}
                style={styles.navArrow}
              >
                <ChevronRight size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Modal/Grilla desplegable de Años */}
        {isYearPickerOpen ? (
          <ScrollView
            style={styles.yearsScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.yearsGrid}
          >
            {years.map((year) => {
              const isSelected = year === currentYear;
              return (
                <TouchableOpacity
                  key={`year_${year}`}
                  activeOpacity={0.7}
                  onPress={() => {
                    setCurrentYear(year);
                    setIsYearPickerOpen(false);
                  }}
                  style={[
                    styles.yearItem,
                    isSelected && styles.yearItemSelected,
                  ]}
                >
                  <AppText
                    variant="bodyMedium"
                    style={[
                      styles.yearItemText,
                      isSelected && styles.yearItemTextSelected,
                    ]}
                  >
                    {year}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            {/* Días de la semana */}
            <View style={styles.weekDaysRow}>
              {WEEK_DAYS.map((w, index) => (
                <View key={`weekday_${index}`} style={styles.weekDayCell}>
                  <AppText variant="caption" style={styles.weekDayText}>
                    {w}
                  </AppText>
                </View>
              ))}
            </View>

            {/* Matriz de días del mes */}
            <View style={styles.daysGrid}>
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <View key={`empty_${i}`} style={styles.dayCell} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected =
                  day === selectedDay &&
                  initialDate.getFullYear() === currentYear &&
                  initialDate.getMonth() === currentMonth;

                const dateObj = new Date(currentYear, currentMonth, day);
                const isDisabled = dateObj > maxDate || dateObj < minDate;

                return (
                  <TouchableOpacity
                    key={`day_${day}`}
                    activeOpacity={0.7}
                    disabled={isDisabled}
                    onPress={() => handleSelectDay(day)}
                    style={[
                      styles.dayCell,
                      isSelected && styles.dayCellSelected,
                      isDisabled && styles.dayCellDisabled,
                    ]}
                  >
                    <AppText
                      variant="bodySmall"
                      style={[
                        styles.dayText,
                        isSelected && styles.dayTextSelected,
                        isDisabled && styles.dayTextDisabled,
                      ]}
                    >
                      {day}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Botón de Confirmación */}
        <View style={styles.footer}>
          <AppButton
            title="Seleccionar fecha"
            onPress={handleConfirm}
            disabled={!selectedDay}
            variant="primary"
          />
        </View>
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  monthYearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSubtle,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  arrowsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearsScroll: {
    maxHeight: 250,
    marginVertical: spacing.sm,
  },
  yearsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  yearItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSubtle,
    minWidth: 70,
    alignItems: 'center',
  },
  yearItemSelected: {
    backgroundColor: colors.primary,
  },
  yearItemText: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  yearItemTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  weekDayCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  weekDayText: {
    fontWeight: '700',
    color: colors.textSecondary,
    fontSize: 12,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  dayCell: {
    width: '14.28%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    marginVertical: 2,
  },
  dayCellSelected: {
    backgroundColor: colors.primary,
  },
  dayCellDisabled: {
    opacity: 0.25,
  },
  dayText: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dayTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  dayTextDisabled: {
    color: colors.textMuted,
  },
  footer: {
    marginTop: spacing.sm,
  },
});

export default DatePickerBottomSheet;
