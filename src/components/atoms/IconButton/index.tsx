import {
  Search,
  ShoppingCart,
  Person,
} from '@mui/icons-material';
import { ElementType } from 'react';
import styled from 'styled-components';

interface IconWrapperProps {
  size: number;
  cursor?: string;
}

interface IconButtonProps {
  onClick?: React.MouseEventHandler<SVGAElement>;
  className?: string;
  color?: string;
  size?: number;
}

const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-block;
  font-size: ${({size}) => size}px;
  cursor: ${({ cursor }) => cursor ?? 'pointer'};
`

/**
 * アイコンボタン
 */
function withIconStyle(Icon: ElementType): React.ComponentType<IconButtonProps> {
  const IconWithStyle = (props: IconButtonProps) => {
    const { onClick, className, size = 24, ...rest } = props;
    const cursor = onClick ? 'pointer' : '';

    return (
      <IconWrapper cursor={cursor} size={size} {...rest}>
        <Icon
          className={className}
          fontSize="inherit"
          color="inherit"
          onClick={onClick}
        />
      </IconWrapper>
    )
  }

  return IconWithStyle;
}

export const SearchIcon = withIconStyle(Search);
export const ShoppingCartIcon = withIconStyle(ShoppingCart);
export const PersonIcon = withIconStyle(Person);
