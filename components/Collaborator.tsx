import Image from 'next/image';
import React, { useState } from 'react'
import UserTypeSelector from './UserTypeSelector';
import { Button } from './ui/button';
import { removeCollaborator, updateDocumentAccess } from '@/lib/actions/room.actions';

const Collaborator = ({ roomId, creatorId, collaborator, email, user }: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer');
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);

    await updateDocumentAccess({ 
      roomId, 
      email, 
      userType: type as UserType, 
      updatedBy: user 
    });

    setLoading(false);
  }

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);

    await removeCollaborator({ roomId, email });

    setLoading(false);
  }

  return (
    <li className="flex items-center justify-between gap-2 py-3 border-b border-pink-50 last:border-b-0">
      <div className="flex gap-3 items-center">
        <Image 
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full ring-2 ring-pink-100"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-slate-800">
            {collaborator.name}
            {loading && (
              <span className="text-xs pl-2 text-pink-600 font-medium inline-flex items-center gap-1">
                <Image src="/assets/icons/loader.svg" alt="loading" width={12} height={12} className="animate-spin" />
                updating...
              </span>
            )}
          </p>
          <p className="text-xs font-normal text-slate-500 mt-0.5">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm font-medium text-pink-600 bg-pink-50 px-2.5 py-1 rounded-md border border-pink-100">Owner</p>
      ): (
        <div className="flex items-center gap-2">
          <UserTypeSelector 
            userType={userType as UserType}
            setUserType={setUserType || 'viewer'}
            onClickHandler={shareDocumentHandler}
          />
          <Button 
            type="button" 
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            disabled={loading}
            className="remove-btn"
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  )
}

export default Collaborator