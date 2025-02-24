'use client';

import styled from "styled-components";

interface UserProfileProps {
  username: string;
  description?: string;
}

const ProfileRoot = styled.section`
  margin-bottom: 8px;
`

const ProfileInner = styled.article`
  margin-inline: auto;
`

const UserName = styled.h1`
  font-size: 16px;
  font-weight: bold;
`

const UserDescription = styled.p`
  font-size: 16px;
`

const UserProfile = ({ username, description }: UserProfileProps) => {
  return (
    <ProfileRoot aria-label="ユーザープロフィール">
      <ProfileInner>
        <UserName>{username}</UserName>
        {description && <UserDescription>{description}</UserDescription>}
      </ProfileInner>
    </ProfileRoot>
  )
}

export default UserProfile;
