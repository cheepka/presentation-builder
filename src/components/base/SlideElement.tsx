import React from 'react';
import { css } from '@emotion/react';

export type SlideElementType = 'image' | 'text' | 'video';
export type SlideElementPosition = 'left' | 'center' | 'right' | 'top' | 'bottom';
export type SlideElementVariant = 'primary' | 'secondary';

export interface SlideElementProps {
  type: SlideElementType;
  className?: string;
  position?: SlideElementPosition;
  variant?: SlideElementVariant;
  children: React.ReactNode;
}

const SlideElement: React.FC<SlideElementProps> = ({
  type,
  className,
  position = 'center',
  variant = 'primary',
  children,
}) => {
  const baseStyles = css`
    position: relative;
    width: 100%;
    height: 100%;
  `;

  const typeStyles = {
    image: css`
      overflow: hidden;
      border-radius: var(--elements-image-borders-radius);
      box-shadow: var(--elements-image-variants-${variant}-shadow);
      border: var(--elements-image-variants-${variant}-border);
    `,
    text: css`
      font-size: var(--elements-text-sizes-medium);
      line-height: var(--elements-text-spacing-lineHeight);
      color: var(--elements-text-variants-${variant}-color);
      font-weight: var(--elements-text-variants-${variant}-weight);
    `,
    video: css`
      overflow: hidden;
      border-radius: var(--elements-image-borders-radius);
    `,
  };

  const positionStyles = css`
    display: flex;
    justify-content: ${position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center'};
    align-items: ${position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center'};
  `;

  return (
    <div
      className={className}
      css={[baseStyles, typeStyles[type], positionStyles]}
    >
      {children}
    </div>
  );
};

export default SlideElement; 