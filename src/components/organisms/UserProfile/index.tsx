'use client';

import styled from "styled-components";

interface UserProfileProps {
  username: string;
}

const ProfileRoot = styled.div`
  margin-bottom: 8px;
`

const UserName = styled.p`
  font-size: 16px;
`

const UserProfile = ({ username }: UserProfileProps) => {
  return (
    <ProfileRoot>
      <UserName>{username}</UserName>
    </ProfileRoot>
  )
}

export default UserProfile;
