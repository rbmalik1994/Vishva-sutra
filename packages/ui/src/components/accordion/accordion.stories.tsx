import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion type="single" collapsible className="w-full" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="bordered" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is your refund policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day money-back guarantee for all our products.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
        <AccordionContent>
          You can cancel your subscription at any time from your account settings.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Separated: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="separated" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Question</AccordionTrigger>
        <AccordionContent>
          First answer content goes here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Question</AccordionTrigger>
        <AccordionContent>
          Second answer content goes here.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! This accordion allows multiple items to be open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Set the type prop to &quot;multiple&quot; to enable this behavior.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
