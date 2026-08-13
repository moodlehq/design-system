import type { ReactElement } from 'react';
import { isValidElement } from 'react';

export type IconElement = ReactElement<'i' | 'svg'>;

// Runtime guard — icon props must be <i> or <svg> elements (same contract as Button)
export const isIconElement = (el: unknown): el is IconElement =>
  isValidElement(el) && (el.type === 'i' || el.type === 'svg');
