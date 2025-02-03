import type { Meta } from '@storybook/react';
import AppLogo from './index';

const meta = {
  title: 'Atoms/AppLogo',
} satisfies Meta<typeof AppLogo>;

export default meta;

export const Logo = () => <AppLogo />;
