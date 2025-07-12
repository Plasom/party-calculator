// Auto-generated design tokens - Do not edit manually
// Generated from tokens.json

export const tokens = {
  color: {
    white: '#ffffff',
    black: {
      primary: '#000000',
      secondary: '#1a1a1a',
      tertiary: '#2d2d2d'
    },
    grey: {
      primary: '#e5e7eb',
      secondary: '#d1d5db',
      tertiary: '#9ca3af'
    },
    neutral: {
      900: '#111827',
      950: '#030712'
    },
    rose: {
      700: '#be123c'
    }
  },
  button: {
    ghost: {
      state: {
        hovered: '#d1d5dc1a',
        pressed: '#d1d5dc33'
      },
      text: '#2d2d2d',
      icon: '#2d2d2d'
    },
    primary: {
      state: {
        hovered: '#111827',
        pressed: '#030712',
        default: '#2d2d2d'
      },
      text: '#ffffff',
      icon: '#ffffff'
    },
    secondary: {
      state: {
        default: '#e5e7eb',
        hovered: '#e6e6e7',
        pressed: '#dadadb'
      },
      text: '#1a1a1a',
      icon: '#1a1a1a'
    },
    ghostDestructive: {
      state: {
        hovered: '#c700361a',
        pressed: '#c7003633'
      },
      text: '#be123c',
      icon: '#be123c'
    },
    disabled: {
      state: {
        default: '#d1d5db',
        hovered: '#d1d5db',
        pressed: '#d1d5db'
      },
      text: '#e5e7eb',
      icon: '#e5e7eb'
    }
  },
  nav: {
    bg: 'rgba(255, 255, 255, 0.4)'
  },
  tag: {
    primary: {
      bg: '#2d2d2d',
      icon: '#ffffff',
      firstText: '#ffffff',
      secondText: '#d1d5db',
      border: '#2d2d2d'
    },
    secondary: {
      bg: '#ffffff',
      icon: '#2d2d2d',
      firstText: '#2d2d2d',
      secondText: '#9ca3af',
      border: '#d1d5db'
    }
  },
  input: {
    state: {
      border: {
        default: '#e5e7eb',
        hovered: '#d1d5db',
        clicked: '#d1d5db'
      },
      text: {
        default: '#e5e7eb',
        hovered: '#d1d5db',
        clicked: '#9ca3af',
        typing: '#2d2d2d'
      }
    },
    bg: '#ffffff'
  }
} as const;

// Helper function to get CSS custom property
export function getCSSVar(path: string): string {
  return `var(--${path.replace(/\./g, '-')})`;
}

// Helper function to get token value
export function getToken(path: string): string {
  const keys = path.split('.');
  let value: unknown = tokens;
  
  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      console.warn(`Token not found: ${path}`);
      return '';
    }
  }
  
  return typeof value === 'string' ? value : '';
}
