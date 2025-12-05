import React from 'react';
import { ActivityIndicator, GestureResponderEvent, Pressable, Text } from 'react-native';
import styled from 'styled-components/native';

import { palette, radii, spacing, typography } from '@styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
};

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: palette.accent, text: palette.primary },
  secondary: { bg: palette.surface, text: palette.text, border: palette.muted },
  ghost: { bg: 'transparent', text: palette.text, border: palette.muted },
};

const StyledPressable = styled(Pressable)<{ variant: ButtonVariant; disabled?: boolean }>`
  background-color: ${({ variant }) => variantStyles[variant].bg};
  padding: ${spacing[4]}px ${spacing[5]}px;
  border-radius: ${radii.md}px;
  border-width: ${({ variant }) => (variantStyles[variant].border ? '1px' : '0px')};
  border-color: ${({ variant }) => variantStyles[variant].border || 'transparent'};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Label = styled(Text)`
  color: ${palette.text};
  font: ${typography.body};
`;

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onPress, disabled, loading }) => {
  return (
    <StyledPressable variant={variant} onPress={onPress} disabled={disabled || loading}>
      {loading ? <ActivityIndicator color={variantStyles[variant].text} /> : <Label>{label}</Label>}
    </StyledPressable>
  );
};
