'use client';

import styled from 'styled-components';
import { theme } from '@/themes';

interface IntroProps {
  title: string;
  description: string;
}

const IntroRoot = styled.section`
  background-color: ${theme.colors.primary};
  display: flex;
  padding: 16px;
`

const IntroInner = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  margin-inline: auto;
  @media screen and (min-width: ${theme.breakPoints.md}) {
    flex-direction: row;
    align-items: center;
    max-width: 1040px;
  }
`

const Heading = styled.h1`
  font-size: ${theme.fontSizes.extraLarge}px;
`

const Intro = ({ title, description }: IntroProps) => {
  return (
    <IntroRoot aria-labelledby='intro-title'>
      <IntroInner>
        <Heading id='intro-title'>{title}</Heading>
        <p>{description}</p>
      </IntroInner>
    </IntroRoot>
  )
}

export default Intro;
