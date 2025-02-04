import type { Meta } from '@storybook/react'
import BreadcrumbItem from './index';

const meta = {
  title: 'Atoms/BreadcrumbItem',
  component: BreadcrumbItem,
  tags: ['autodocs']
} satisfies Meta<typeof BreadcrumbItem>;

export default meta;

export const Standard = () => (
  <div>
    <BreadcrumbItem>Item 1</BreadcrumbItem>
    <BreadcrumbItem>Item 2</BreadcrumbItem>
    <BreadcrumbItem>Item 3</BreadcrumbItem>
  </div>
)
