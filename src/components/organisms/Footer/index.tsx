"use client";

import styled from "styled-components";

const FooterRoot = styled.footer`
  border-top: solid 1px gray;
`

const Footer = () => {
  return (
    <FooterRoot>
      フッター
      <small>© sample Co., Ltd.. All rights reserved.</small>
    </FooterRoot>
  )
}

export default Footer;
