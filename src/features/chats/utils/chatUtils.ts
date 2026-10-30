/**
 * Utilidades compartidas del chat privado.
 * Solo funciones puras (sin hooks ni side-effects).
 */

export const isUUID = (str?: string | null): boolean => {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
};

export const formatMessageTime = (dateStr?: string | Date | null): string => {
  if (!dateStr) {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;

  if (isNaN(date.getTime())) {
    return 'Hoy';
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
