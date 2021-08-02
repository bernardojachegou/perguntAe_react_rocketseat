import { ButtonHTMLAttributes } from 'react';
import 'src/components/Button/styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? 'outlined' : '¿'}`}
      {...props}
    ></button>
  );
}
