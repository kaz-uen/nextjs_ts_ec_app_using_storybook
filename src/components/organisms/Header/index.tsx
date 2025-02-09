"use client";

import styled from 'styled-components';
import Link from 'next/link';
import {
  SearchIcon,
  PersonIcon,
  ShoppingCartIcon
} from '@/components/atoms/IconButton';

const HeaderRoot = styled.header`
  display: flex;
  align-items: center;
  height: 88px;
  padding: 8px 0;
  border-bottom: solid 1px #cdced2;
  @media screen and (min-width: 768px) {
    padding: 16px 0;
  }
`

const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  @media screen and (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`

const Nav = styled.nav.attrs({
  'aria-label': 'メインナビゲーション'
})`
  height: 56px;
  display: flex;
  align-items: center;
  & span:not(:first-child) {
    margin-left: 16px;
  }
`

const SpNotShow = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`

const Logo = styled.span`
  display: inline-block;
  margin-right: 16px;
`

const NavLink = styled.span`
  display: inline;
`

const Anchor = styled.span.attrs({
  'role': 'link'
})`
  &:hover {
    text-decoration: underline;
  }
`

const Header = () => {
  // TODO: 後ほど実装
  const authUser = null;

  return (
    <HeaderRoot>
      <HeaderInner>
        <Nav>
          <Logo>
            <Link href="/">
              <Anchor>（ロゴ）</Anchor>
            </Link>
          </Logo>
          <SpNotShow>
            <NavLink>
              <Link href="/search">
                <Anchor>すべて</Anchor>
              </Link>
            </NavLink>
            <NavLink>
              <Link href="/search/clothes">
                <Anchor>トップス</Anchor>
              </Link>
            </NavLink>
            <NavLink>
              <Link href="/search/book">
                <Anchor>本</Anchor>
              </Link>
            </NavLink>
            <NavLink>
              <Link href="/search/shoes">
                <Anchor>シューズ</Anchor>
              </Link>
            </NavLink>
          </SpNotShow>
        </Nav>
        <Nav>
          <NavLink>
            <Link href="/search">
              <Anchor><SearchIcon /></Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/cart">
              <Anchor><ShoppingCartIcon /></Anchor>
            </Link>
          </NavLink>
          <NavLink>
            {authUser ? (
              // TODO:後で実装する
              <span>アイコン</span>
            ): (
              <Link href="/signin">
                <Anchor><PersonIcon /></Anchor>
              </Link>
            )}
          </NavLink>
        </Nav>
      </HeaderInner>
    </HeaderRoot>
  )
}

export default Header;
