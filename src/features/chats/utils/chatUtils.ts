/**
 * Utilidades compartidas del chat privado.
 * Solo funciones puras (sin hooks ni side-effects).
 */

export const formatMessageTime = (dateStr?: string): string => {
  if (!dateStr) {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return 'Hoy';
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
