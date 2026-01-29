import type { Meta, StoryObj } from '@storybook/react';
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from './field';
import { Input } from '../input';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldControl>
        <Input type="email" placeholder="Enter your email" />
      </FieldControl>
      <FieldDescription>We&apos;ll never share your email with anyone else.</FieldDescription>
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field required>
      <FieldLabel>Username</FieldLabel>
      <FieldControl>
        <Input placeholder="Enter your username" />
      </FieldControl>
      <FieldDescription>This is your public display name.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field error="This field is required">
      <FieldLabel>Password</FieldLabel>
      <FieldControl>
        <Input type="password" placeholder="Enter your password" />
      </FieldControl>
      <FieldError>This field is required</FieldError>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <FieldLabel>Disabled Field</FieldLabel>
      <FieldControl>
        <Input disabled placeholder="This field is disabled" />
      </FieldControl>
    </Field>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Field required>
        <FieldLabel>Full Name</FieldLabel>
        <FieldControl>
          <Input placeholder="John Doe" />
        </FieldControl>
      </Field>
      <Field required>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <Input type="email" placeholder="john@example.com" />
        </FieldControl>
        <FieldDescription>Your primary email address.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <FieldControl>
          <Input placeholder="Tell us about yourself" />
        </FieldControl>
        <FieldDescription>A brief description about yourself.</FieldDescription>
      </Field>
    </div>
  ),
};
