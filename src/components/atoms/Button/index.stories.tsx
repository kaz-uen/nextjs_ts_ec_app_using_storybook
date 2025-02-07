import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
      defaultValue: 'primary',
      description: 'ボタンバリアント',
      table: {
        type: { summary: 'primary | secondary | danger' },
        defaultValue: { summary: 'primary' },
      },
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Button',
      description: 'ボタンテキスト',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Disabledフラグ',
      table: { type: { summary: 'boolean' } },
    },
    onClick: {
      description: 'onClickイベントハンドラ',
      table: { type: { summary: 'function' } },
    },
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  }
};
