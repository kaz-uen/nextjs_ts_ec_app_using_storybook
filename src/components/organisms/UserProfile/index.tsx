'use client';

import styled from "styled-components";

interface UserProfileProps {
  username: string;
  description?: string;
}

const ProfileRoot = styled.div`
  margin-bottom: 8px;
`

const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
`

const UserDescription = styled.p`
  font-size: 16px;
`

const UserProfile = ({ username, description }: UserProfileProps) => {
  return (
    <ProfileRoot>
      <UserName>{username}</UserName>
      <UserDescription>{description}</UserDescription>
    </ProfileRoot>
  )
}

export default UserProfile;
