import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LabSession, LabQuestion } from "@/data/demoData";
import { Play, Send, X, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CodeEditor from "./CodeEditor";
import ResultPanel from "./ResultPanel";
import { mockExecuteCode, TestResult } from "@/lib/codeExecutor";

interface LabEnvironmentProps {
  lab: LabSession;
  onClose: () => void;
  onSubmit: (answers: Record<string, { answer: string; code: string; language: string }>) => void;
}

export default function LabEnvironment({ lab, onClose, onSubmit }: LabEnvironmentProps) {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<
      string,
      {
        answer: string;
        code: string;
        language: string;
        lastRun?: TestResult[];
      }
    >
  >({});
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(
    new Set()
  );

  // Initialize answers for all questions
  useEffect(() => {
    const initialAnswers: typeof answers = {};
    lab.questions.forEach((q) => {
      initialAnswers[q.id] = {
        answer: "",
        code: "",
        language: "python",
      };
    });
    setAnswers(initialAnswers);
  }, [lab]);

  const currentQuestion = lab.questions[currentQuestionIndex];

  const handleCodeChange = (code: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        code,
      },
    }));
  };

  const handleLanguageChange = (language: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        language,
      },
    }));
  };

  const handleRunCode = async () => {
    if (!answers[currentQuestion.id]?.code.trim()) {
      toast({
        title: "No Code",
        description: "Please write some code before running.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    try {
      const results = mockExecuteCode(
        answers[currentQuestion.id].code,
        currentQuestion.testCases || [],
        answers[currentQuestion.id].language
      );

      setTestResults(results);

      // Check if all test cases passed
      const allPassed = results.every((r) => r.passed);
      if (allPassed) {
        setCompletedQuestions((prev) => new Set([...prev, currentQuestion.id]));
        toast({
          title: "Great!",
          description: "All test cases passed!",
        });
      } else {
        const failedCount = results.filter((r) => !r.passed).length;
        toast({
          title: "Some Tests Failed",
          description: `${failedCount} out of ${results.length} test cases failed.`,
          variant: "destructive",
        });
      }

      // Store the last run results
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          lastRun: results,
        },
      }));
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitLab = async () => {
    // Check if all questions have code
    const allHaveCode = lab.questions.every(
      (q) => answers[q.id]?.code.trim()
    );

    if (!allHaveCode) {
      toast({
        title: "Incomplete",
        description: "All questions must have code before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const submissionData = lab.questions.reduce(
        (acc, q) => {
          acc[q.id] = {
            answer: answers[q.id]?.answer || "",
            code: answers[q.id]?.code || "",
            language: answers[q.id]?.language || "python",
          };
          return acc;
        },
        {} as Record<string, { answer: string; code: string; language: string }>
      );
      onSubmit(submissionData);
    }, 1000);
  };

  const questionsWithStatus = lab.questions.map((q) => ({
    ...q,
    isCompleted: completedQuestions.has(q.id),
    hasCode: !!answers[q.id]?.code.trim(),
  }));

  const allQuestionsCompleted =
    lab.questions.length === completedQuestions.size;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{lab.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{lab.objectives}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {completedQuestions.size}/{lab.questions.length} Complete
          </Badge>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - Questions */}
        <div className="w-1/2 border-r flex flex-col">
          {/* Theory Section */}
          <div className="p-6 border-b">
            <h3 className="font-semibold mb-2">Theory</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lab.theory}
            </p>
          </div>

          {/* Questions List */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {questionsWithStatus.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    currentQuestion.id === q.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : q.isCompleted
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                        : "bg-card border-border hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="font-medium">Q{idx + 1}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">
                          {q.question}
                        </p>
                        {q.description && (
                          <p className="text-xs opacity-70 mt-1 line-clamp-1">
                            {q.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {q.isCompleted && (
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    {!q.isCompleted && q.hasCode && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT PANEL - Editor and Results */}
        <div className="w-1/2 flex flex-col">
          {/* Question Details */}
          <ScrollArea className="flex-1 border-b">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Q{currentQuestionIndex + 1}. {currentQuestion.question}
                </h2>
                {currentQuestion.description && (
                  <p className="text-muted-foreground">
                    {currentQuestion.description}
                  </p>
                )}
              </div>

              {currentQuestion.examples && currentQuestion.examples.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Examples</h4>
                  <div className="space-y-2">
                    {currentQuestion.examples.map((ex, idx) => (
                      <Card key={idx} className="bg-muted">
                        <CardContent className="p-3 space-y-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Input:
                            </p>
                            <p className="font-mono text-sm">{ex.input}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Output:
                            </p>
                            <p className="font-mono text-sm">{ex.output}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {currentQuestion.constraints && (
                <div>
                  <h4 className="font-semibold mb-2">Constraints</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentQuestion.constraints}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Code Editor and Results */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <CodeEditor
              code={answers[currentQuestion.id]?.code || ""}
              language={answers[currentQuestion.id]?.language || "python"}
              onChange={handleCodeChange}
              onLanguageChange={handleLanguageChange}
              onRun={handleRunCode}
              isRunning={isRunning}
            />

            {testResults && (
              <ResultPanel
                testResults={testResults}
                testCases={currentQuestion.testCases || []}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {allQuestionsCompleted && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">All questions completed!</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitLab}
            disabled={isSubmitting}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Lab"}
          </Button>
        </div>
      </div>
    </div>
  );
}
