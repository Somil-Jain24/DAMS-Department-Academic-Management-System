import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  AlertCircle,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  description: string;
  time: string;
  priority: "high" | "medium" | "low";
  read: boolean;
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "MST 2 Schedule Released",
      description: "Mid-semester test 2 will be held from Dec 20-24",
      time: "2 hours ago",
      priority: "high",
      read: false,
    },
    {
      id: "2",
      title: "Hackathon Registration Open",
      description: "Register for the annual department hackathon",
      time: "1 day ago",
      priority: "medium",
      read: false,
    },
    {
      id: "3",
      title: "Lab Hours Extended",
      description: "Computer lab now open till 8 PM on weekdays",
      time: "3 days ago",
      priority: "low",
      read: true,
    },
  ]);

  const unreadCount = announcements.filter((a) => !a.read).length;

  const markAsRead = (id: string) => {
    setAnnouncements(
      announcements.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  };

  const markAllAsRead = () => {
    setAnnouncements(announcements.map((a) => ({ ...a, read: true })));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive animate-pulse" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 z-50 w-96 rounded-xl border bg-card shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div>
                  <h3 className="font-semibold">Announcements</h3>
                  {unreadCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>

              {/* Announcements List */}
              <ScrollArea className="h-96">
                {announcements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                    <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      No announcements
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className={cn(
                          "p-4 transition-colors hover:bg-muted/50",
                          !announcement.read && "bg-primary/5"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {/* Priority Indicator */}
                          <div
                            className={cn(
                              "mt-0.5 rounded-full p-1.5 shrink-0",
                              announcement.priority === "high"
                                ? "bg-destructive/10 text-destructive"
                                : announcement.priority === "medium"
                                ? "bg-warning/10 text-warning"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {announcement.priority === "high" ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </div>

                          {/* Content */}
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => markAsRead(announcement.id)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-sm leading-snug">
                                {announcement.title}
                              </h4>
                              {!announcement.read && (
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                              {announcement.description}
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              {announcement.time}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => deleteAnnouncement(announcement.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              {announcements.length > 0 && (
                <div className="border-t p-3 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Announcements
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
