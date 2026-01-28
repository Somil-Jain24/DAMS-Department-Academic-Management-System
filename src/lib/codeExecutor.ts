export interface TestResult {
  testCaseId: number;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime: number;
  error?: string;
  isHidden?: boolean;
}

/**
 * Mock code executor that simulates running code against test cases
 * This is a demonstration - in production, you'd connect to a real code execution service
 */
export function mockExecuteCode(
  code: string,
  testCases: Array<{ input: string; output: string; isHidden?: boolean }>,
  language: string
): TestResult[] {
  const results: TestResult[] = [];

  // Simple validation to check if code looks reasonable
  const hasLogic = code.trim().length > 0;

  testCases.forEach((testCase, index) => {
    const executionTime = Math.random() * 500 + 50; // Simulate 50-550ms execution time

    try {
      // Parse test case input/output based on language and test case format
      const actualOutput = simulateCodeExecution(
        code,
        testCase.input,
        language
      );

      const passed = actualOutput.trim() === testCase.output.trim();

      results.push({
        testCaseId: index + 1,
        passed,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput,
        executionTime: Math.round(executionTime),
        isHidden: testCase.isHidden,
      });
    } catch (error) {
      results.push({
        testCaseId: index + 1,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: "",
        executionTime: Math.round(Math.random() * 100 + 10),
        error: error instanceof Error ? error.message : "Execution error",
        isHidden: testCase.isHidden,
      });
    }
  });

  return results;
}

/**
 * Simulate code execution based on code patterns and language
 * This is a simplified mock - in production, you'd use a real sandbox/compiler
 */
function simulateCodeExecution(
  code: string,
  input: string,
  language: string
): string {
  // Split code into lines
  const lines = code.split("\n").map((line) => line.trim());
  const codeUpper = code.toUpperCase();

  // Language-specific simulation
  if (language === "sql") {
    return simulateSQLExecution(code, input);
  } else if (language === "python" || language === "java" || language === "cpp") {
    return simulateProgrammingExecution(code, input, language);
  } else if (language === "javascript") {
    return simulateJSExecution(code, input);
  }

  // Default fallback
  return "output";
}

function simulateSQLExecution(code: string, input: string): string {
  const codeUpper = code.toUpperCase();

  // Simple SQL pattern matching
  if (
    codeUpper.includes("SELECT") &&
    codeUpper.includes("MARKS") &&
    codeUpper.includes("80")
  ) {
    // Simulating "SELECT * FROM students WHERE marks >= 80"
    if (input.includes("80")) return "Alice,Bob,Charlie";
    if (input.includes("90")) return "Bob";
    if (input.includes("75")) return "Alice,Bob,Charlie,David";
  }

  if (codeUpper.includes("JOIN") && codeUpper.includes("STUDENT")) {
    // Simulating JOIN queries
    if (input.includes("Alice")) return "Mathematics,Physics";
    if (input.includes("subject:Mathematics"))
      return "Alice,Bob,David";
    if (input.includes("all"))
      return "Complete enrollment list";
  }

  if (codeUpper.includes("SECOND") || codeUpper.includes("SALARY")) {
    // Simulating second highest salary
    if (input.includes("1000,2000,3000,4000")) return "3000";
    if (input.includes("5000,5000")) return "null";
    if (input.includes("100,200,300,400,500")) return "400";
  }

  return "query executed";
}

function simulateProgrammingExecution(
  code: string,
  input: string,
  language: string
): string {
  const codeUpper = code.toUpperCase();

  // Linked List operations
  if (
    codeUpper.includes("INSERT") ||
    codeUpper.includes("APPEND") ||
    codeUpper.includes("PUSH")
  ) {
    // Insert at beginning
    if (input.includes("1,2,3|0")) {
      // Parsing "list=1,2,3, value=0"
      return "0,1,2,3";
    }
    if (input.includes("5,6|4")) return "4,5,6";
    if (input.includes("|10")) return "10";

    // Stack push/peek
    if (input.includes("push:5|push:10|push:3|peek")) return "3";
    if (input.includes("push:1|size")) return "1";
    if (input.includes("push:7|push:8|pop|peek")) return "7";
  }

  if (codeUpper.includes("DELETE") || codeUpper.includes("REMOVE")) {
    // Delete node by value
    if (input.includes("1,2,3,4|2")) return "1,3,4";
    if (input.includes("5|5")) return "";
    if (input.includes("1,1,1|1")) return "";
  }

  if (codeUpper.includes("REVERSE")) {
    // Reverse linked list
    if (input === "1,2,3,4,5") return "5,4,3,2,1";
    if (input === "10,20") return "20,10";
    if (input === "1") return "1";
  }

  if (codeUpper.includes("BALANCED") || codeUpper.includes("PARENTHES")) {
    // Check balanced parentheses
    return checkBalancedParentheses(input) ? "true" : "false";
  }

  if (codeUpper.includes("POSTFIX") || codeUpper.includes("EVAL")) {
    // Evaluate postfix expression
    return evaluatePostfix(input);
  }

  // Generic response if no pattern matched
  return "success";
}

function simulateJSExecution(code: string, input: string): string {
  const codeUpper = code.toUpperCase();

  // Similar pattern matching for JavaScript
  if (codeUpper.includes("BALANCED")) {
    return checkBalancedParentheses(input) ? "true" : "false";
  }

  return "output";
}

/**
 * Check if parentheses/brackets are balanced
 */
function checkBalancedParentheses(str: string): boolean {
  const stack: string[] = [];
  const pairs: { [key: string]: string } = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  // Remove quotes and extract only brackets
  const cleaned = str.replace(/['"]/g, "");

  for (const char of cleaned) {
    if (char in pairs) {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.length === 0) return false;
      const last = stack.pop();
      if (pairs[last!] !== char) return false;
    }
  }

  return stack.length === 0;
}

/**
 * Evaluate postfix expression
 */
function evaluatePostfix(expression: string): string {
  const tokens = expression.split(/\s+/);
  const stack: number[] = [];

  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      if (stack.length < 2) {
        throw new Error("Invalid postfix expression");
      }
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(Math.floor(a / b));
          break;
      }
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack.length === 1 ? stack[0].toString() : "error";
}
