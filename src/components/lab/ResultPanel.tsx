import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { TestResult } from "@/lib/codeExecutor";

interface ResultPanelProps {
  testResults: TestResult[];
  testCases: Array<{ input: string; output: string; isHidden?: boolean }>;
}

export default function ResultPanel({ testResults, testCases }: ResultPanelProps) {
  const [expandedTestCase, setExpandedTestCase] = useState<number | null>(
    testResults.findIndex((r) => !r.passed)
  );

  const passedCount = testResults.filter((r) => r.passed).length;
  const failedCount = testResults.filter((r) => !r.passed).length;
  const totalCount = testResults.length;

  const allPassed = failedCount === 0;

  return (
    <div className="flex flex-col h-1/3 bg-card border-t">
      {/* Result Summary */}
      <div
        className={`px-4 py-3 border-b ${
          allPassed
            ? "bg-green-50 dark:bg-green-900/20"
            : "bg-red-50 dark:bg-red-900/20"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {allPassed ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <div>
              <p className="font-semibold text-sm">
                {allPassed
                  ? "All Test Cases Passed! 🎉"
                  : `${failedCount} Test Case${failedCount !== 1 ? "s" : ""} Failed`}
              </p>
              <p className="text-xs text-muted-foreground">
                {passedCount}/{totalCount} test cases passed
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
            >
              ✅ {passedCount}
            </Badge>
            {failedCount > 0 && (
              <Badge
                variant="outline"
                className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
              >
                ❌ {failedCount}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Test Cases List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {testResults.map((result, idx) => (
            <Card
              key={idx}
              className={`cursor-pointer transition-colors ${
                result.passed
                  ? "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50"
                  : "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50"
              } ${expandedTestCase === idx ? "ring-2 ring-primary" : ""}`}
              onClick={() =>
                setExpandedTestCase(expandedTestCase === idx ? null : idx)
              }
            >
              <CardContent className="p-0">
                <button
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:opacity-80 transition-opacity"
                  onClick={() =>
                    setExpandedTestCase(expandedTestCase === idx ? null : idx)
                  }
                >
                  <div className="flex items-center gap-3 flex-1">
                    {result.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">
                        Test Case {result.testCaseId}
                        {result.isHidden && (
                          <span className="ml-2 text-xs opacity-60">(Hidden)</span>
                        )}
                      </p>
                      {result.error && (
                        <p className="text-xs text-red-600 dark:text-red-400 truncate">
                          {result.error}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {result.executionTime}ms
                    </span>
                    {expandedTestCase === idx ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {/* Expanded details */}
                {expandedTestCase === idx && (
                  <div className="border-t px-4 py-3 space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Input
                        </p>
                        <code className="block p-2 bg-background rounded border font-mono text-xs overflow-x-auto max-h-24 overflow-y-auto break-words">
                          {result.input}
                        </code>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Expected Output
                        </p>
                        <code className="block p-2 bg-background rounded border font-mono text-xs overflow-x-auto max-h-24 overflow-y-auto break-words">
                          {result.expectedOutput}
                        </code>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Your Output
                      </p>
                      <code
                        className={`block p-2 rounded border font-mono text-xs overflow-x-auto max-h-24 overflow-y-auto break-words ${
                          result.passed
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50"
                            : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50"
                        }`}
                      >
                        {result.actualOutput || "(No output)"}
                      </code>
                    </div>

                    {result.error && (
                      <div>
                        <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">
                          Error Message
                        </p>
                        <code className="block p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800/50 font-mono text-xs text-red-700 dark:text-red-300 overflow-x-auto max-h-24 overflow-y-auto">
                          {result.error}
                        </code>
                      </div>
                    )}

                    {!result.passed && !result.error && (
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded">
                        <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">
                          💡 Hint
                        </p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                          {getHint(result)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

/**
 * Generate helpful hints based on the mismatch between expected and actual output
 */
function getHint(result: TestResult): string {
  const expected = result.expectedOutput.trim();
  const actual = result.actualOutput.trim();

  if (!actual) {
    return "Your code produced no output. Make sure you're returning or printing the result.";
  }

  if (actual.length < expected.length) {
    return "Your output is shorter than expected. Check if you're handling all elements correctly.";
  }

  if (actual.length > expected.length) {
    return "Your output is longer than expected. You might be including extra elements or whitespace.";
  }

  if (actual.split(",").length !== expected.split(",").length) {
    return "The number of elements in your output doesn't match. Review your logic for handling multiple items.";
  }

  // Check for common issues
  if (actual.toLowerCase() === expected.toLowerCase()) {
    return "Case mismatch! Check if you need to handle uppercase/lowercase differently.";
  }

  if (actual.replace(/\s+/g, "") === expected.replace(/\s+/g, "")) {
    return "Whitespace mismatch! Ensure you're formatting the output correctly.";
  }

  return "The output doesn't match the expected result. Double-check your algorithm and logic.";
}
