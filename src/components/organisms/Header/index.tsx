"use client";

import styled from 'styled-components';
import Link from 'next/link';

const HeaderRoot = styled.header`
  height: 88px;
  padding: 16px 0;
  border-bottom: solid 1px #cdced2;
`

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 32px;
`

const HeaderNav = styled.nav`
  height: 56px;
  display: flex;
  align-items: center;
  & > span:not(:first-child) {
    margin-left: 16px;
  }
`

const NavLink = styled.span`
  display: inline;
`

const Anchor = styled.span`
  &:hover {
    text-decoration: underline;
  }
`

const Header = () => {
  return (
    <HeaderRoot>
      <HeaderInner>
        <HeaderNav>
          <NavLink>
            <Link href="/">
              <Anchor>Link</Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/">
              <Anchor>Link</Anchor>
            </Link>
          </NavLink>
        </HeaderNav>
        <HeaderNav>
          <NavLink>
            <Link href="/">
              <Anchor>Link</Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/">
              <Anchor>Link</Anchor>
            </Link>
          </NavLink>
        </HeaderNav>
      </HeaderInner>
    </HeaderRoot>
  )
}

export default Header;
