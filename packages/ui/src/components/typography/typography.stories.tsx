import type { Meta, StoryObj } from '@storybook/react';
import {
  Typography,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyList,
} from './typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllTypography: Story = {
  render: () => (
    <div className="space-y-6">
      <TypographyH1>The Joke Tax Chronicles</TypographyH1>
      <TypographyLead>
        A story about the king who loved to tax everything, including humor.
      </TypographyLead>
      <TypographyP>
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to
        him with a problem: the kingdom was running out of money.
      </TypographyP>
      <TypographyH2>The King&apos;s Plan</TypographyH2>
      <TypographyP>
        The king, being a wise and cunning ruler, thought long and hard about
        how to solve the kingdom&apos;s financial woes. And then it hit him: he would
        tax the jokes.
      </TypographyP>
      <TypographyBlockquote>
        &ldquo;After all,&rdquo; he said, &ldquo;everyone loves to laugh. If I can tax their
        laughter, I can fill the treasury in no time!&rdquo;
      </TypographyBlockquote>
      <TypographyH3>The Joke Tax</TypographyH3>
      <TypographyP>
        The king implemented the joke tax the very next day. He also made it mandatory for all court jesters to include a <TypographyInlineCode>taxRate</TypographyInlineCode> property in their performances.
      </TypographyP>
      <TypographyList>
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of puns: 10 gold coins</li>
        <li>3rd level of puns: 20 gold coins</li>
      </TypographyList>
      <TypographyH4>The People&apos;s Reaction</TypographyH4>
      <TypographyP>
        The people were not pleased with the joke tax. <TypographyLarge>But they kept laughing anyway.</TypographyLarge>
      </TypographyP>
      <TypographySmall>The End.</TypographySmall>
      <TypographyMuted>This is a work of fiction.</TypographyMuted>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
    </div>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <TypographyLead>Lead text - larger and slightly muted</TypographyLead>
      <TypographyP>Regular paragraph text</TypographyP>
      <TypographyLarge>Large text for emphasis</TypographyLarge>
      <TypographySmall>Small text for fine print</TypographySmall>
      <TypographyMuted>Muted text for secondary content</TypographyMuted>
    </div>
  ),
};

export const CodeAndBlockquote: Story = {
  render: () => (
    <div className="space-y-4">
      <TypographyP>
        Use the <TypographyInlineCode>npm install</TypographyInlineCode> command to install packages.
      </TypographyP>
      <TypographyBlockquote>
        The only way to do great work is to love what you do.
      </TypographyBlockquote>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <TypographyList>
      <li>First item in the list</li>
      <li>Second item with more details</li>
      <li>Third item to complete the trio</li>
    </TypographyList>
  ),
};
