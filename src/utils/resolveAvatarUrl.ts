import { API_CONFIG } from '@/config/api';

/**
 * Resuelve una URL de avatar (relativa del backend o externa) a una URL absoluta
 * accesible para el componente Image de React Native.
 */
export const resolveAvatarUrl = (url?: string | null): string => {
  if (!url || !url.trim()) return '';

  // Si ya es una URL absoluta o archivo local, retornarla tal cual
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('file://') ||
    url.startsWith('content://')
  ) {
    return url;
  }

  // Si es una ruta relativa del backend (ej: /api/v1/files/..., /files/..., /uploads/...)
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/api(\/v1)?\/?$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
};

export default resolveAvatarUrl;
