import React from 'react';
type PolymorphicAs<C extends React.ElementType> = {
    as?: C;
};
type CardOwnProps = {
    className?: string;
    children?: React.ReactNode;
};
type CardProps<C extends React.ElementType> = CardOwnProps & PolymorphicAs<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof CardOwnProps | 'as'>;
export declare function Card<C extends React.ElementType = 'div'>({ as, className, children, ...rest }: CardProps<C>): import("react/jsx-runtime").JSX.Element;
export default Card;
//# sourceMappingURL=Card.d.ts.map