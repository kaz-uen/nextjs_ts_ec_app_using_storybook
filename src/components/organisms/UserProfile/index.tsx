'use client';

import type { User } from "@/types";
import { theme } from "@/themes";
import styled from "styled-components";

type UserProfileProps = Omit<User, "id" | "username" | "displayName" | "profileImageUrl">

const ProfileRoot = styled.section`
  margin-bottom: 8px;
`

const ProfileInner = styled.article`
  margin-inline: auto;
`

const Heading = styled.h1`
  font-size: ${theme.fontSizes.large}px;
  font-weight: bold;
  margin-bottom: 8px;
`

const Description = styled.p`
  font-size: ${theme.fontSizes.medium}px;
  margin-bottom: 8px;
`

const FirstName = styled.span`
  display: inline-block;
`

const LastName = styled.span`
  display: inline-block;
  margin-right: 8px;
`

const Info = styled.div`
  border: solid 1px ${theme.colors.black};
  padding: 16px;
`

const InfoHeading = styled.h2`
  font-size: ${theme.fontSizes.medium}px;
  font-weight: bold;
  margin-bottom: 16px;
`

const TableHeading = styled.th`
  width: 140px;
  text-align: right;
`

const UserProfile = ({
  firstName,
  lastName,
  furiganaFirst,
  furiganaLast,
  tel,
  email,
  description
}: UserProfileProps) => {
  return (
    <ProfileRoot aria-label="ユーザープロフィール">
      <ProfileInner>
        <Heading>
          <LastName>{lastName}</LastName>
          <FirstName>{firstName}</FirstName>
          さんの会員ページ
        </Heading>
        <Description>会員登録の際にいただいた情報です。</Description>

        <Info>
          <InfoHeading>お客様情報</InfoHeading>
          <table>
            <tbody>
              <tr>
                <TableHeading>お名前：</TableHeading>
                <td>{lastName}&nbsp;{firstName}&nbsp;様</td>
              </tr>
              <tr>
                <TableHeading>フリガナ：</TableHeading>
                <td>{furiganaLast}&nbsp;{furiganaFirst}&nbsp;様</td>
              </tr>
              <tr>
                <TableHeading>電話番号：</TableHeading>
                <td>{tel}</td>
              </tr>
              <tr>
                <TableHeading>メールアドレス：</TableHeading>
                <td>{email}</td>
              </tr>
              {description &&
                <tr>
                  <TableHeading>一言：</TableHeading>
                  <td>{description}</td>
                </tr>
              }
            </tbody>
          </table>
        </Info>
      </ProfileInner>
    </ProfileRoot>
  )
}

export default UserProfile;
