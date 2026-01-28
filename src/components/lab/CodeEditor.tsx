import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Copy, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const LANGUAGE_TEMPLATES: Record<string, string> = {
  python: `# Write your Python code here
def solution(input_data):
    # Parse input and implement solution
    pass
`,
  java: `// Write your Java code here
public class Solution {
    public static void main(String[] args) {
        // Your solution here
    }
}
`,
  cpp: `// Write your C++ code here
#include <iostream>
using namespace std;

int main() {
    // Your solution here
    return 0;
}
`,
  javascript: `// Write your JavaScript code here
function solution(inputData) {
    // Parse input and implement solution
    return result;
}
`,
  sql: `-- Write your SQL query here
SELECT *
FROM students
WHERE /* condition */;
`,
};

export default function CodeEditor({
  code,
  language,
  onChange,
  onLanguageChange,
  onRun,
  isRunning,
}: CodeEditorProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    // Optionally show template for new language
    if (!code.trim()) {
      onChange(LANGUAGE_TEMPLATES[newLanguage] || "");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `solution.${getFileExtension(language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      python: "py",
      java: "java",
      cpp: "cpp",
      javascript: "js",
      sql: "sql",
    };
    return extensions[lang] || "txt";
  };

  return (
    <div className="flex flex-col h-full border-b bg-card">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Language:</label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            title="Copy code"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            title="Download code"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={onRun}
            disabled={isRunning}
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden flex">
        {/* Line numbers */}
        <div className="bg-muted w-12 border-r flex flex-col items-end px-2 py-3 overflow-hidden text-right text-xs text-muted-foreground">
          {code.split("\n").map((_, idx) => (
            <div key={idx} className="h-6 leading-6">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Code textarea */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          placeholder={LANGUAGE_TEMPLATES[language] || "// Write your code here..."}
          className="flex-1 px-4 py-3 font-mono text-sm bg-card text-foreground resize-none focus:outline-none border-none"
          spellCheck="false"
          style={{
            lineHeight: "1.5rem",
            tabSize: 4,
          }}
        />
      </div>
    </div>
  );
}
