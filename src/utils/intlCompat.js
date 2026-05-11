/**
 * Módulo de compatibilidade Intl para navegadores antigos e Smart TVs
 * Fornece suporte seguro para RelativeTimeFormat com fallback
 */

// Importar polyfill se disponível
let relativeTimeFormatLoaded = false;
try {
  import('@formatjs/intl-relativetimeformat').then(() => {
    relativeTimeFormatLoaded = true;
    console.log('[Intl Compat] Polyfill @formatjs/intl-relativetimeformat carregado com sucesso');
  }).catch((err) => {
    console.warn('[Intl Compat] Falha ao carregar polyfill:', err.message);
  });
} catch (err) {
  console.warn('[Intl Compat] Polyfill não disponível:', err.message);
}

/**
 * Log de diagnóstico - informa suporte disponível no navegador
 */
export function logCompatibilityInfo() {
  const info = {
    navegador: `${navigator.userAgent.split(' ').slice(-1)[0]}`,
    intlAvailable: typeof Intl !== 'undefined',
    relativeTimeFormatSupport: 
      typeof Intl !== 'undefined' && 
      typeof Intl.RelativeTimeFormat !== 'undefined',
    dateTimeFormatSupport:
      typeof Intl !== 'undefined' &&
      typeof Intl.DateTimeFormat !== 'undefined',
    numberFormatSupport:
      typeof Intl !== 'undefined' &&
      typeof Intl.NumberFormat !== 'undefined',
    polyfillLoaded: relativeTimeFormatLoaded,
  };

  console.group('[Intl Compat] Suporte do Navegador');
  console.log('🌍 Navegador:', info.navegador);
  console.log('✓ Intl disponível:', info.intlAvailable);
  console.log('✓ RelativeTimeFormat:', info.relativeTimeFormatSupport ? 'SUPORTADO' : 'NÃO SUPORTADO');
  console.log('✓ DateTimeFormat:', info.dateTimeFormatSupport ? 'SUPORTADO' : 'NÃO SUPORTADO');
  console.log('✓ NumberFormat:', info.numberFormatSupport ? 'SUPORTADO' : 'NÃO SUPORTADO');
  console.log('✓ Polyfill carregado:', relativeTimeFormatLoaded ? 'SIM' : 'NÃO');
  console.groupEnd();

  return info;
}

/**
 * Verifica se RelativeTimeFormat está disponível (nativo ou via polyfill)
 */
export function hasRelativeTimeFormat() {
  return (
    typeof Intl !== 'undefined' &&
    typeof Intl.RelativeTimeFormat !== 'undefined'
  );
}

/**
 * Verifica suporte básico de Intl
 */
export function hasIntlSupport() {
  return typeof Intl !== 'undefined';
}

/**
 * Fallback seguro para RelativeTimeFormat
 * Gera strings de tempo relativo sem usar Intl.RelativeTimeFormat
 */
export function formatTimeAgoFallback(diffValue, unit) {
  const units = {
    minute: { plural: 'minutos', singular: 'minuto', past: 'há', future: 'em' },
    hour: { plural: 'horas', singular: 'hora', past: 'há', future: 'em' },
    day: { plural: 'dias', singular: 'dia', past: 'há', future: 'em' },
    week: { plural: 'semanas', singular: 'semana', past: 'há', future: 'em' },
    month: { plural: 'meses', singular: 'mês', past: 'há', future: 'em' },
    year: { plural: 'anos', singular: 'ano', past: 'há', future: 'em' },
  };

  const unitInfo = units[unit] || units.day;
  const absValue = Math.abs(diffValue);
  const text = absValue === 1 ? unitInfo.singular : unitInfo.plural;
  const prefix = diffValue < 0 ? unitInfo.past : unitInfo.future;

  return `${prefix} ${absValue} ${text}`;
}

/**
 * FormataTimeAgo com suporte seguro - usa RelativeTimeFormat se disponível,
 * caso contrário usa fallback
 */
export function safeRelativeTimeFormat(diffValue, unit, locale = 'pt-BR') {
  try {
    if (hasRelativeTimeFormat()) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      return rtf.format(diffValue, unit);
    }
  } catch (error) {
    console.warn('[Intl Compat] Erro ao usar RelativeTimeFormat:', error.message);
    console.log('[Intl Compat] Ativando fallback...');
  }

  return formatTimeAgoFallback(diffValue, unit);
}

/**
 * Formata data com fallback seguro
 */
export function safeDateTimeFormat(date, locale = 'pt-BR', options = {}) {
  try {
    if (
      typeof Intl !== 'undefined' &&
      typeof Intl.DateTimeFormat !== 'undefined'
    ) {
      const formatter = new Intl.DateTimeFormat(locale, options);
      return formatter.format(date);
    }
  } catch (error) {
    console.warn('[Intl Compat] Erro ao usar DateTimeFormat:', error.message);
  }

  // Fallback simples para data/hora
  return date.toLocaleDateString();
}

/**
 * Formata localTime com fallback
 */
export function safeLocaleTimeString(date, locale = 'pt-BR', options = {}) {
  try {
    if (typeof date.toLocaleTimeString === 'function') {
      return date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        ...options,
      });
    }
  } catch (error) {
    console.warn('[Intl Compat] Erro ao usar toLocaleTimeString:', error.message);
  }

  // Fallback simples
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/**
 * Formata localDate com fallback
 */
export function safeLocaleDateString(date, locale = 'pt-BR', options = {}) {
  try {
    if (typeof date.toLocaleDateString === 'function') {
      return date.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...options,
      });
    }
  } catch (error) {
    console.warn('[Intl Compat] Erro ao usar toLocaleDateString:', error.message);
  }

  // Fallback simples
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

// Log inicial de compatibilidade ao importar este módulo
if (typeof window !== 'undefined') {
  // Executa no navegador, não no servidor
  window.__intlCompatLogRun = false;
  if (!window.__intlCompatLogRun) {
    window.__intlCompatLogRun = true;
    console.log('[Intl Compat] Módulo carregado - iniciando verificação de compatibilidade...');
    // Agendar log após um pequeno delay para permitir carregamento completo
    setTimeout(logCompatibilityInfo, 100);
  }
}

export default {
  logCompatibilityInfo,
  hasRelativeTimeFormat,
  hasIntlSupport,
  formatTimeAgoFallback,
  safeRelativeTimeFormat,
  safeDateTimeFormat,
  safeLocaleTimeString,
  safeLocaleDateString,
};
