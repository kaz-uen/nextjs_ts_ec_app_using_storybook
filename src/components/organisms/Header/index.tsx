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
const NavLink = styled.span`
  display: inline;
`

const Nav = styled.nav.attrs({
  'aria-label': 'メインナビゲーション'
})`
  height: 56px;
  display: flex;
  align-items: center;
  & ${NavLink}:not(:first-child) {
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

const Anchor = styled.span.attrs({
  'role': 'link'
})`
  &:hover {
    text-decoration: underline;
  }
`

const textNavItems = [
  { id: 'all', href: '/search', label: 'すべて' },
  { id: 'clothes', href: '/search/clothes', label: 'トップス' },
  { id: 'book', href: '/search/book', label: '本' },
  { id: 'shoes', href: '/search/shoes', label: 'シューズ' },
] as const;

const iconNavItems = [
  { id: 'search', href: '/search', icon: SearchIcon },
  { id: 'cart', href: '/search/clothes', icon: ShoppingCartIcon },
] as const;

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
            {textNavItems.map(({ id, href, label }) => (
              <NavLink key={id}>
                <Link href={href}>
                  <Anchor>{label}</Anchor>
                </Link>
              </NavLink>
            ))}
          </SpNotShow>
        </Nav>
        <Nav>
          {iconNavItems.map(({ id, href, icon: Icon }) => ( // iconプロパティはIconという新しい変数名で受け取る
            <NavLink key={id}>
              <Link href={href}>
                <Anchor><Icon /></Anchor>
              </Link>
            </NavLink>
          ))}
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
