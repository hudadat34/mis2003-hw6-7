import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: true },
    { id: 3, text: "Reply to emails", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-none bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl font-bold text-center tracking-tight text-slate-900">
            Todo List
          </CardTitle>
          <p className="text-sm text-slate-500 text-center font-medium">
            Stay organized and get things done.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={addTodo} className="flex gap-2 relative">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 pr-12 h-12 text-base shadow-sm border-slate-200 focus-visible:ring-slate-400"
              data-testid="input-new-todo"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 top-1 h-10 w-10 rounded-md transition-all hover:scale-105"
              data-testid="button-add-todo"
              disabled={!inputValue.trim()}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </form>

          <div className="space-y-3 min-h-[200px]">
            {todos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                <p>No tasks yet.</p>
                <p className="text-sm">Add one above!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={cn(
                    "group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md",
                    todo.completed 
                      ? "bg-slate-50 border-slate-100" 
                      : "bg-white border-slate-200"
                  )}
                  data-testid={`row-todo-${todo.id}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden flex-1">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={cn(
                        "flex-shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 rounded-full",
                        todo.completed ? "text-green-500" : "text-slate-300 hover:text-slate-400"
                      )}
                      data-testid={`button-toggle-${todo.id}`}
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </button>
                    <span
                      className={cn(
                        "truncate transition-all text-base select-none cursor-pointer",
                        todo.completed 
                          ? "text-slate-400 line-through decoration-slate-300" 
                          : "text-slate-700 font-medium"
                      )}
                      onClick={() => toggleTodo(todo.id)}
                      data-testid={`text-todo-${todo.id}`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-red-500 hover:bg-red-50 focus:opacity-100"
                    data-testid={`button-delete-${todo.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
          
           <div className="flex justify-between items-center text-xs font-medium text-slate-400 pt-4 border-t border-slate-100">
              <span data-testid="text-items-left">
                {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
              </span>
              {todos.some(t => t.completed) && (
                 <button 
                    onClick={() => setTodos(todos.filter(t => !t.completed))}
                    className="hover:text-slate-600 transition-colors focus:outline-none"
                    data-testid="button-clear-completed"
                 >
                   Clear completed
                 </button>
              )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
