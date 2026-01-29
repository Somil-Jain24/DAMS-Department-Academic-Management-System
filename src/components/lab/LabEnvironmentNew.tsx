import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { LabSession, LabQuestion } from "@/data/demoData";
import {
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CodePanel from "./CodePanel";
import ResultPanel from "./ResultPanel";
import { mockExecuteCode, TestResult } from "@/lib/codeExecutor";

interface LabEnvironmentNewProps {
  lab: LabSession;
  onClose: () => void;
  onSubmit: (answers: Record<string, { theory: string; code: string; language: string }>) => void;
}

interface QuestionState {
  expanded: boolean;
  theory: string;
  code: string;
  language: string;
  testResults?: TestResult[];
  theoryFilled: boolean;
  codeSaved: boolean;
}

export default function LabEnvironmentNew({
  lab,
  onClose,
  onSubmit,
}: LabEnvironmentNewProps) {
  const { toast } = useToast();
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(
    lab.questions[0]?.id || ""
  );
  const [questionStates, setQuestionStates] = useState<
    Record<string, QuestionState>
  >({});
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize question states
  useEffect(() => {
    const initial: Record<string, QuestionState> = {};
    lab.questions.forEach((q) => {
      initial[q.id] = {
        expanded: false,
        theory: "",
        code: "",
        language: "python",
        theoryFilled: false,
        codeSaved: false,
      };
    });
    setQuestionStates(initial);
  }, [lab]);

  const currentQuestion = lab.questions.find((q) => q.id === currentQuestionId);
  const currentState = questionStates[currentQuestionId];

  const toggleQuestion = (questionId: string) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        expanded: !prev[questionId].expanded,
      },
    }));
    if (currentQuestionId !== questionId) {
      setCurrentQuestionId(questionId);
    }
  };

  const handleTheoryChange = (value: string) => {
    const isFilled = value.trim().length > 0;
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestionId]: {
        ...prev[currentQuestionId],
        theory: value,
        theoryFilled: isFilled,
      },
    }));
  };

  const handleCodeChange = (code: string) => {
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestionId]: {
        ...prev[currentQuestionId],
        code,
        codeSaved: code.trim().length > 0,
      },
    }));
  };

  const handleLanguageChange = (language: string) => {
    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestionId]: {
        ...prev[currentQuestionId],
        language,
      },
    }));
  };

  const handleRunCode = async () => {
    if (!currentState?.code.trim()) {
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
        currentState.code,
        currentQuestion?.testCases || [],
        currentState.language
      );

      setQuestionStates((prev) => ({
        ...prev,
        [currentQuestionId]: {
          ...prev[currentQuestionId],
          testResults: results,
        },
      }));

      const allPassed = results.every((r) => r.passed);
      if (allPassed) {
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
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    // Check if all questions have theory and code
    const allComplete = lab.questions.every(
      (q) =>
        questionStates[q.id]?.theoryFilled &&
        questionStates[q.id]?.codeSaved
    );

    if (!allComplete) {
      const incomplete = lab.questions.filter(
        (q) =>
          !questionStates[q.id]?.theoryFilled ||
          !questionStates[q.id]?.codeSaved
      );
      toast({
        title: "Incomplete Submission",
        description: `Please complete theory and code for: ${incomplete
          .map((q, i) => `Q${i + 1}`)
          .join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const submissionData = lab.questions.reduce(
        (acc, q) => {
          const state = questionStates[q.id];
          acc[q.id] = {
            theory: state?.theory || "",
            code: state?.code || "",
            language: state?.language || "python",
          };
          return acc;
        },
        {} as Record<string, { theory: string; code: string; language: string }>
      );
      onSubmit(submissionData);
    }, 1000);
  };

  // Count complete questions
  const completeCount = lab.questions.filter(
    (q) => questionStates[q.id]?.theoryFilled && questionStates[q.id]?.codeSaved
  ).length;

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
            {completeCount}/{lab.questions.length} Complete
          </Badge>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex overflow-hidden gap-4 p-4">
        {/* LEFT PANEL - Questions Accordion */}
        <div className="w-1/2 flex flex-col">
          {/* Lab Theory */}
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                  Lab Overview
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                  {lab.theory}
                </p>
              </div>
            </div>
          </div>

          {/* Questions Accordion */}
          <ScrollArea className="flex-1 border rounded-lg bg-card">
            <div className="p-3 space-y-2">
              {lab.questions.map((question, idx) => {
                const state = questionStates[question.id];
                const isCurrentQuestion = currentQuestionId === question.id;
                const isExpanded = state?.expanded;
                const isComplete =
                  state?.theoryFilled && state?.codeSaved;

                return (
                  <div key={question.id} className="border rounded-lg">
                    {/* Question Header - Clickable */}
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
                        isCurrentQuestion
                          ? "bg-primary/10"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className="font-semibold text-sm">Q{idx + 1}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {question.question}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {isComplete && (
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            )}
                            {!isComplete && state?.theory && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            )}
                            {isComplete && (
                              <span className="text-xs text-green-600">
                                Complete
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>

                    {/* Question Content - Accordion */}
                    {isExpanded && (
                      <div className="border-t px-4 py-3 bg-muted/30 space-y-3">
                        {question.description && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1">
                              Description
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">
                              {question.description}
                            </p>
                          </div>
                        )}

                        {question.examples && question.examples.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">
                              Examples
                            </p>
                            <div className="space-y-2">
                              {question.examples.map((ex, exIdx) => (
                                <div
                                  key={exIdx}
                                  className="p-2 bg-background border rounded text-xs"
                                >
                                  <div className="mb-1">
                                    <span className="font-medium">Input:</span>{" "}
                                    <code>{ex.input}</code>
                                  </div>
                                  <div>
                                    <span className="font-medium">Output:</span>{" "}
                                    <code>{ex.output}</code>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {question.constraints && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1">
                              Constraints
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {question.constraints}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT PANEL - Solution Writing */}
        {currentQuestion && currentState && (
          <div className="w-1/2 flex flex-col border rounded-lg bg-card overflow-hidden min-h-0">
            {/* Tabs */}
            <Tabs defaultValue="theory" className="flex-1 flex flex-col min-h-0">
              <div className="border-b px-4 pt-3 flex-shrink-0">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="theory" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Theory
                  </TabsTrigger>
                  <TabsTrigger value="code" className="gap-2">
                    <Code className="h-4 w-4" />
                    Code
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Theory Mode */}
              <TabsContent value="theory" className="flex flex-col flex-1 px-4 pb-4">
                <div className="flex-1 flex flex-col">
                  <div className="mt-3">
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      Explain Your Approach
                      <span className="text-red-600 ml-1">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Explain what you understood from the question and describe your
                      approach in your own words. (Minimum 20 characters)
                    </p>
                    <Textarea
                      placeholder="What is the problem asking for?&#10;What approach will you use to solve it?&#10;Explain your logic..."
                      value={currentState.theory}
                      onChange={(e) => handleTheoryChange(e.target.value)}
                      className="flex-1 resize-none min-h-[300px]"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {currentState.theory.length} characters
                      </p>
                      {currentState.theoryFilled && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Code Mode */}
              <TabsContent value="code" className="flex-1 flex flex-col min-h-0 overflow-hidden p-0 m-0 data-[state=active]:flex">
                <div className="flex-1 h-full flex flex-col min-h-0 overflow-hidden">
                  <CodePanel
                    code={currentState.code}
                    language={currentState.language}
                    onChange={handleCodeChange}
                    onLanguageChange={handleLanguageChange}
                    onRun={handleRunCode}
                    isRunning={isRunning}
                  />
                </div>

                {currentState.testResults && (
                  <div className="flex-shrink-0 max-h-[200px] overflow-auto border-t">
                    <ResultPanel
                      testResults={currentState.testResults}
                      testCases={currentQuestion.testCases || []}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {completeCount === lab.questions.length && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">All questions complete!</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || completeCount < lab.questions.length}
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
