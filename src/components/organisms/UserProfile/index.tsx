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

const Name = styled.h1`
  font-size: ${theme.fontSizes.mediumLarge}px;
  font-weight: bold;
`

const FirstName = styled.span`
  display: inline-block;
`

const LastName = styled.span`
  display: inline-block;
  margin-right: 8px;
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
        <Name>
          <LastName>{lastName}</LastName>
          <FirstName>{firstName}</FirstName>
          さんの会員ページ
        </Name>
        <p>会員登録の際にいただいた情報です。</p>

        <div>
          <h2>お客様情報</h2>
          <table>
            <tr>
              <th>お名前：</th>
              <td>{lastName}&nbsp;{firstName}&nbsp;様</td>
            </tr>
            <tr>
              <th>フリガナ：</th>
              <td>{furiganaLast}&nbsp;{furiganaFirst}&nbsp;様</td>
            </tr>
            <tr>
              <th>電話番号：</th>
              <td>{tel}</td>
            </tr>
            <tr>
              <th>メールアドレス：</th>
              <td>{email}</td>
            </tr>
            {description &&
              <tr>
                <th>一言：</th>
                <td>{description}</td>
              </tr>
            }
          </table>
        </div>
      </ProfileInner>
    </ProfileRoot>
  )
}

export default UserProfile;
