'use client';

import { createDocument } from '@/lib/actions/room.actions';
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addDocumentHandler = async () => {
    setLoading(true);
    try {
      const room = await createDocument({ userId, email });

      if(room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Button 
      type="submit" 
      onClick={addDocumentHandler} 
      disabled={loading}
      className="gradient-pink flex items-center gap-2 rounded-lg px-4 py-2 shadow-md transition-all disabled:opacity-75"
    >
      {loading ? (
        <>
          <Image 
            src="/assets/icons/loader.svg" 
            alt="loading" 
            width={20} 
            height={20} 
            className="animate-spin"
          />
          <p className="hidden sm:block text-sm font-medium">Creating...</p>
        </>
      ) : (
        <>
          <Image 
            src="/assets/icons/add.svg" 
            alt="add" 
            width={20} 
            height={20} 
          />
          <p className="hidden sm:block text-sm font-medium">Start a blank document</p>
        </>
      )}
    </Button>
  )
}

export default AddDocumentBtn