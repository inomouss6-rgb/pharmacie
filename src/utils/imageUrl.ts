/**
 * Utility to ensure all image assets load reliably across local dev,
 * Vite preview, and production domains (e.g., https://vitalpharma.ai.studio/).
 */

export function getAssetUrl(path: string | undefined): string {
  if (!path) return '';
  // Strip '/public/' prefix because Vite serves public files directly from the root '/'
  if (path.startsWith('/public/')) {
    return path.slice('/public'.length);
  }
  if (path.startsWith('public/')) {
    return '/' + path.slice('public/'.length);
  }
  return path;
}

/**
 * Fallback error handler for <img> elements:
 * If an asset fails to load with /assets/..., it attempts /public/assets/... and vice versa.
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (!target.dataset.retried) {
    target.dataset.retried = 'true';
    if (target.src.includes('/assets/aistudio/') && !target.src.includes('/public/assets/aistudio/')) {
      target.src = target.src.replace('/assets/aistudio/', '/public/assets/aistudio/');
      return;
    }
    if (target.src.includes('/public/assets/aistudio/')) {
      target.src = target.src.replace('/public/assets/aistudio/', '/assets/aistudio/');
      return;
    }
  }
}
