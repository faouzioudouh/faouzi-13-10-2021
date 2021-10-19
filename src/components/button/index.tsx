import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react';

import './button.css';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button: FC<Props> = memo(({ children, ...rest }) => {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  );
});
