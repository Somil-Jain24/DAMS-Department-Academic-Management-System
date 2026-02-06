import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Note {
  id: string;
  title: string;
  drawing: string;
  text: string;
  savedAt: string;
  classId?: string;
  className?: string;
}

interface WhiteboardProps {
  isOpen: boolean;
  onClose: () => void;
  editingNote?: Note;
  classId?: string;
  className?: string;
}

const Whiteboard = ({ isOpen, onClose, editingNote }: WhiteboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (canvasRef.current && isOpen) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = brushSize;
        ctx.strokeStyle = "#000000";
        setContext(ctx);

        // Load existing note if editing
        if (editingNote) {
          setTitle(editingNote.title);
          setNotes(editingNote.text);
          const img = new Image();
          img.src = editingNote.drawing;
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
        } else {
          setTitle("");
          setNotes("");
        }
      }
    }
  }, [isOpen, editingNote]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isErasing) {
      context.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize * 2, brushSize * 2);
    } else {
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (context) {
      context.closePath();
    }
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveNotes = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your notes",
        variant: "destructive",
      });
      return;
    }

    const timestamp = editingNote ? editingNote.savedAt : new Date().toLocaleString();
    const noteContent: Note = {
      id: editingNote?.id || `note_${Date.now()}`,
      title: title.trim(),
      drawing: canvasRef.current?.toDataURL() || "",
      text: notes,
      savedAt: timestamp,
    };

    localStorage.setItem(
      noteContent.id,
      JSON.stringify(noteContent)
    );

    toast({
      title: "Notes Saved",
      description: `"${title}" has been saved successfully`,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Whiteboard Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-2xl bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-primary/5 to-accent/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold">{editingNote ? "Edit Note" : "Create Notes"}</h2>
                  <p className="text-sm text-muted-foreground">Draw or type your notes</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title (required)"
                className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 gap-4 overflow-hidden p-4">
              {/* Canvas Area */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    variant={isErasing ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsErasing(!isErasing)}
                    className="flex-1"
                  >
                    {isErasing ? "✏️ Drawing" : "🧹 Eraser"}
                  </Button>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium">Size:</label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCanvas}
                    className="gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="flex-1 cursor-crosshair rounded-lg border-2 border-dashed border-muted bg-white"
                />
              </div>

              {/* Text Area */}
              <div className="w-64 flex flex-col gap-2">
                <label className="text-sm font-medium">Text Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type your notes here..."
                  className="flex-1 rounded-lg border bg-muted/50 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-muted/30 p-4 flex gap-2">
              {editingNote && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    localStorage.removeItem(editingNote.id);
                    toast({
                      title: "Note Deleted",
                      description: `"${editingNote.title}" has been deleted`,
                    });
                    onClose();
                  }}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Discard
              </Button>
              <Button
                onClick={saveNotes}
                className="flex-1 gap-2"
              >
                <Save className="h-4 w-4" />
                Save Notes
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Whiteboard;
