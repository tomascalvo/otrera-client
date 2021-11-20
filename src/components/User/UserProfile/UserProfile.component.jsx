import React from 'react';

// hooks

import { useParams } from 'react-router-dom';

const UserProfile = () => {

  // hooks

  const { userId: profileId } = useParams();
  
  return (
    <div>
      <p>
        profileId: {profileId}
      </p>
    </div>
  )
}

export default UserProfile
