"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { AddUserForm } from "./add-user-form";

export function AddUserDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="size-4" />
        Add user
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Create a new account. The user can sign in immediately with this email and password.
          </DialogDescription>
        </DialogHeader>
        <AddUserForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
