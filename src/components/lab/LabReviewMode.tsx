import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LabSession, LabSubmission } from "@/data/demoData";
import {
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code,
} from "lucide-react";

interface LabReviewModeProps {
  lab: LabSession;
  submission: LabSubmission;
  onClose: () => void;
}

export default function LabReviewMode({
  lab,
  submission,
  onClose,
}: LabReviewModeProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set()
  );

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{lab.title}</h1>
            <Badge className="bg-green-500">Completed</Badge>
            {submission.marks && (
              <Badge variant="outline" className="text-lg">
                {submission.marks}%
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{lab.objectives}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Lab Theory */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 mt-0.5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-2">Lab Overview</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lab.theory}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback (if available) */}
          {submission.feedback && (
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Feedback
                </h3>
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  {submission.feedback}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Submitted Answers */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Submitted Answers</h2>
            <div className="space-y-2">
              {lab.questions.map((question, idx) => {
                const answer = submission.answers.find(
                  (a) => a.questionId === question.id
                );
                const isExpanded = expandedQuestions.has(question.id);

                return (
                  <Card key={question.id}>
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className="font-semibold text-sm">Q{idx + 1}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {question.question}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {answer ? (
                              <>
                                Theory: {answer.answer.length} characters • Code:{" "}
                                {answer.code?.length || 0} characters
                              </>
                            ) : (
                              "No answer submitted"
                            )}
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>

                    {isExpanded && answer && (
                      <div className="border-t px-4 py-4 space-y-4">
                        {/* Question Details */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Question Details
                          </h4>
                          {question.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                              {question.description}
                            </p>
                          )}
                          {question.examples && question.examples.length > 0 && (
                            <div className="bg-muted p-2 rounded text-xs space-y-1 mb-2">
                              <p className="font-medium">Examples:</p>
                              {question.examples.map((ex, exIdx) => (
                                <div key={exIdx} className="ml-2">
                                  <span className="font-medium">Input:</span>{" "}
                                  <code>{ex.input}</code> →{" "}
                                  <span className="font-medium">Output:</span>{" "}
                                  <code>{ex.output}</code>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Theory Answer */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <h4 className="text-sm font-semibold">
                              Your Theory Answer
                            </h4>
                          </div>
                          <div className="bg-muted p-3 rounded border text-xs leading-relaxed text-foreground whitespace-pre-wrap break-words">
                            {answer.answer || "(No theory submitted)"}
                          </div>
                        </div>

                        {/* Code Answer */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="h-4 w-4 text-muted-foreground" />
                            <h4 className="text-sm font-semibold">
                              Your Code Solution
                            </h4>
                            {answer.language && (
                              <Badge variant="outline" className="text-xs ml-auto">
                                {answer.language.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                          <div className="bg-muted p-3 rounded border font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                            {answer.code || "(No code submitted)"}
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Submitted On</p>
                  <p className="font-medium">
                    {new Date(submission.submittedAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{submission.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-card px-6 py-4 flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
