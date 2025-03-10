import styled from 'styled-components';

// バッジの円形
const BadgeWrapper = styled.div<{ backgroundColor: string }>`
  border-radius: 20px;
  height: 20px;
  min-width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

// バッジ内のテキスト
const BadgeText = styled.p`
  color: white;
  font-size: 11px;
  user-select: none;
`;

interface Props {
  content: string;
  backgroundColor: string;
}

/**
 * バッジ
 */
const Badge = ({ content, backgroundColor }: Props) => {
  return (
    <BadgeWrapper backgroundColor={backgroundColor}>
      <BadgeText>{content}</BadgeText>
    </BadgeWrapper>
  )
};

export default Badge;
