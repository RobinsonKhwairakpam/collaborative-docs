'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useSelf } from '@liveblocks/react/suspense';
import React, { useState } from 'react'
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('viewer');

  const shareDocumentHandler = async () => {
    if (!email) return;
    setLoading(true);

    try {
      await updateDocumentAccess({ 
        roomId, 
        email, 
        userType: userType as UserType, 
        updatedBy: user.info,
      });
      setEmail('');
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-pink flex h-9 gap-1.5 px-4 rounded-lg shadow-md" disabled={currentUserType !== 'editor'}>
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block font-medium text-sm">
            Share
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog border border-pink-100 bg-white rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-slate-800 text-lg font-semibold">Manage who can view this project</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">Select which users can view and edit this document</DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-slate-700 font-medium">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-lg border border-pink-200 bg-white overflow-hidden shadow-sm">
            <Input 
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input border-none"
            />
            <UserTypeSelector 
              userType={userType}
              setUserType={setUserType}
            />
          </div>
          <Button type="submit" onClick={shareDocumentHandler} className="gradient-pink flex h-11 items-center gap-1.5 px-5 rounded-lg shadow-md" disabled={loading}>
            {loading ? (
              <>
                <Image 
                  src="/assets/icons/loader.svg" 
                  alt="loader" 
                  width={16} 
                  height={16} 
                  className="animate-spin"
                />
                <span>Inviting...</span>
              </>
            ) : 'Invite'}
          </Button>
        </div>

        <div className="my-2 space-y-2">
          <ul className="flex flex-col divider-y">
            {collaborators.map((collaborator) => (
              <Collaborator 
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal