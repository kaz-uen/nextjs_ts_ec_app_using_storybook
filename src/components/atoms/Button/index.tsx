import styled from 'styled-components';

// ボタンのバリアント
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
  textAlign?: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  display?: string;
  border?: string;
  overflow?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  pseudoClass?: {
    hover?: {
      backgroundColor?: string;
    }
    disabled?: {
      backgroundColor?: string;
    }
  },
  onClick?: () => void;
};

const variants = {
  // primary: {
  //   backgroundColor: '#313131',
  // },
  // secondary: {
  //   backgroundColor: '#00f519',
  // },
  // danger: {
  //   backgroundColor: '#ed1c24',
  // },
  primary: '#313131',
  secondary: '#00f519',
  danger: '#ed1c24',
}

/**
 * ボタン
 */
const ButtonWrapper = styled.button`
  cursor: pointer;
  outline: 0;
  text-decoration: 'none';
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  border-radius: 4px;
  border: none;

  background-color: ${({ variant }) => variants[variant] ? variants[variant] : '#333'};
`;

const Button = ({ children, variant, disabled, onClick }: ButtonProps) => {
  return (
    <ButtonWrapper variant={variant} disabled={disabled} onClick={onClick}>
      {children}
    </ButtonWrapper>
  )
};

export default Button;
