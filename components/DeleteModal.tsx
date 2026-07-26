"use client";

import Image from "next/image";
import { useState } from "react";

import { deleteDocument } from "@/lib/actions/room.actions";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

export const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log("Error notif:", error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-100 p-2 transition-all shadow-sm">
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={18}
            height={18}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog border border-pink-100 bg-white rounded-lg shadow-md">
        <DialogHeader>
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle className="text-slate-800 text-lg font-semibold">Delete document</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5 gap-3">
          <DialogClose asChild className="w-full flex items-center justify-center cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium border border-slate-200 shadow-sm">
            <span>Cancel</span>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            disabled={loading}
            className="gradient-red w-full flex items-center justify-center gap-1.5 rounded-lg shadow-md"
          >
            {loading ? (
              <>
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loading"
                  width={16}
                  height={16}
                  className="animate-spin"
                />
                <span>Deleting...</span>
              </>
            ) : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
