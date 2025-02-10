'use client';

import styled from 'styled-components';

interface IntroProps {
  title: string;
  description: string;
}

const IntroRoot = styled.section`
  background-color: #f2f2f2;
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
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    max-width: 1040px;
  }
`

const Heading = styled.h1`
  font-size: 24px;
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
