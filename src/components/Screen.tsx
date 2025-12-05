import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import styled from 'styled-components/native';

import { palette, spacing } from '@styles/theme';

type ScreenProps = {
  children: React.ReactNode;
  padded?: boolean;
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${palette.background};
`;

const Content = styled(View)<{ padded?: boolean }>`
  flex: 1;
  padding: ${({ padded }) => (padded ? `${spacing[5]}px` : '0px')};
`;

export const Screen: React.FC<ScreenProps> = ({ children, padded = true }) => (
  <Container>
    <StatusBar barStyle="light-content" />
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Content padded={padded}>{children}</Content>
    </ScrollView>
  </Container>
);
