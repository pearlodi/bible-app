import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { useState } from "react";
  
  interface NewNoteDialogProps {
    onCreate: (name: string) => void;
    noteCount: number;
  }
  
  export default function NewNoteDialog({ onCreate, noteCount }: NewNoteDialogProps) {
    const [open, setOpen] = useState(false);
    const [noteName, setNoteName] = useState("");
  
    const handleCreate = () => {
      const trimmed = noteName.trim();
      if (trimmed && noteCount < 3) {
        onCreate(trimmed);
        setNoteName("");
        setOpen(false);
      }
    };
  
    const isLimitReached = noteCount >= 3;
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-black" variant="outline" >
            + New Note
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isLimitReached ? "Note Limit Reached" : "Name Your Note"}
            </DialogTitle>
          </DialogHeader>
  
          {isLimitReached ? (
            <p className="text-sm text-red-500">You can only create 3 notes.</p>
          ) : (
            <>
              <Input
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                placeholder="Enter note title"
              />
              <DialogFooter>
                <Button onClick={handleCreate}>Create</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  