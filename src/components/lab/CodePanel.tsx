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

interface CodePanelProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const LANGUAGE_TEMPLATES: Record<string, string> = {
  python: `# Write your solution here
def solution(input_data):
    # Parse input and implement solution
    pass
`,
  java: `// Write your solution here
public class Solution {
    public static void main(String[] args) {
        // Your solution here
    }
}
`,
  cpp: `// Write your solution here
#include <iostream>
using namespace std;

int main() {
    // Your solution here
    return 0;
}
`,
  javascript: `// Write your solution here
function solution(inputData) {
    // Parse input and implement solution
    return result;
}
`,
  sql: `-- Write your SQL solution here
SELECT *
FROM table_name
WHERE /* condition */;
`,
};

export default function CodePanel({
  code,
  language,
  onChange,
  onLanguageChange,
  onRun,
  isRunning,
}: CodePanelProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
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
    <div className="flex flex-col h-full w-full">
      {/* Toolbar - Fixed Height */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center justify-between gap-4 border-b bg-card">
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

      {/* Code Editor - Fills Remaining Space */}
      <div className="flex-grow overflow-hidden flex h-full">
        {/* Line numbers */}
        <div className="bg-muted w-10 flex-shrink-0 overflow-y-auto px-1.5 py-2 text-right text-xs text-muted-foreground">
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
          className="flex-1 py-2 px-3 font-mono text-sm bg-background text-foreground resize-none focus:outline-none border-none h-full"
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
