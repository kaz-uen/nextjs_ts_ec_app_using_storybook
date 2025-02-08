import {
  Search,
  ShoppingCart,
  Person,
} from '@mui/icons-material';
import SvgIcon from '@mui/material/SvgIcon';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: inline-block;
  font-size: ${({size}) => size}px;
  cursor: ${({ cursor }) => cursor ?? 'pointer'};
`

/**
 * アイコンボタン
 */
function withIconStyle(Icon) {
  const IconWithStyle = (props) => {
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
