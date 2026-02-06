import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Note {
  id: string;
  title: string;
  drawing: string;
  text: string;
  savedAt: string;
}

interface NotesSectionProps {
  onNoteSelect: (note: Note) => void;
  onCreateNew: () => void;
  sidebarOpen: boolean;
}

const NotesSection = ({ onNoteSelect, onCreateNew, sidebarOpen }: NotesSectionProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
    // Listen for storage changes
    window.addEventListener("storage", loadNotes);
    return () => window.removeEventListener("storage", loadNotes);
  }, []);

  const loadNotes = () => {
    const loadedNotes: Note[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("note_") || key?.match(/^\d+$/)) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const note = JSON.parse(data);
            if (note.id && note.title) {
              loadedNotes.push(note);
            }
          }
        } catch (e) {
          // Skip invalid entries
        }
      }
    }
    // Sort by date, newest first
    setNotes(loadedNotes.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-sidebar-foreground/70" />
            {sidebarOpen && (
              <span className="text-sm font-semibold text-sidebar-foreground">
                NOTES
              </span>
            )}
          </div>
          {sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCreateNew}
              className="h-6 w-6 text-sidebar-foreground/70 hover:bg-sidebar-accent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-2">
        {notes.length === 0 ? (
          <>
            {sidebarOpen && (
              <div className="text-center py-6 px-4">
                <FileText className="h-8 w-8 mx-auto text-sidebar-foreground/30 mb-2" />
                <p className="text-xs text-sidebar-foreground/50">No notes yet</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCreateNew}
                  className="mt-3 w-full gap-1 h-8 text-xs"
                >
                  <Plus className="h-3 w-3" />
                  Create First Note
                </Button>
              </div>
            )}
          </>
        ) : (
          <ul className="space-y-1">
            {notes.map((note, index) => (
              <motion.li
                key={note.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <button
                  onClick={() => onNoteSelect(note)}
                  className={cn(
                    "w-full text-left rounded-lg px-3 py-2 transition-all duration-200",
                    "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  title={note.title}
                >
                  {sidebarOpen ? (
                    <div className="space-y-0.5">
                      <div className="font-medium text-sm truncate">{note.title}</div>
                      <div className="text-xs text-sidebar-foreground/50">
                        {formatDate(note.savedAt)}
                      </div>
                    </div>
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
