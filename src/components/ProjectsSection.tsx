import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, Github, Layers, Cpu, Globe, Palette, Info, X, CheckCircle2, 
  ArrowRight, Sparkles, CheckSquare, Plus, Trash2, Check, RotateCcw
} from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = 'dipesh_portfolio_todos_demo';

export const ProjectsSection: React.FC = () => {
  const projects: ProjectItem[] = INITIAL_PROJECTS;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showTodoDemo, setShowTodoDemo] = useState(false);

  // Mini Interactive Simulator for To-Do List Project
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { id: '1', text: 'Review Dipesh\'s single-page A4 resume', completed: true },
      { id: '2', text: 'Inspect verified CodeUp AI Edge internship certificate', completed: true },
      { id: '3', text: 'Schedule technical interview with Dipesh', completed: false },
    ];
  });

  const [newTodoText, setNewTodoText] = useState('');
  const [todoFilter, setTodoFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const item: TodoItem = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
    };
    setTodos([item, ...todos]);
    setNewTodoText('');
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleResetTodos = () => {
    const defaults = [
      { id: '1', text: 'Review Dipesh\'s single-page A4 resume', completed: true },
      { id: '2', text: 'Inspect verified CodeUp AI Edge internship certificate', completed: true },
      { id: '3', text: 'Schedule technical interview with Dipesh', completed: false },
    ];
    setTodos(defaults);
  };

  const filteredTodos = todos.filter(t => {
    if (todoFilter === 'active') return !t.completed;
    if (todoFilter === 'completed') return t.completed;
    return true;
  });

  const getProjectIcon = (id: string, title: string) => {
    if (id === 'proj-todo') return <CheckSquare className="w-5 h-5 text-emerald-400" />;
    if (title.includes('AI') || id === 'proj-1') return <Cpu className="w-5 h-5 text-cyan-400" />;
    if (title.includes('Parking')) return <Layers className="w-5 h-5 text-purple-400" />;
    if (title.includes('Portfolio')) return <Globe className="w-5 h-5 text-indigo-400" />;
    return <Palette className="w-5 h-5 text-pink-400" />;
  };

  const handleLiveDemoClick = (proj: ProjectItem) => {
    if (proj.id === 'proj-todo') {
      setShowTodoDemo(true);
      return;
    }
    const url = proj.liveDemoUrl;
    if (!url) return;
    if (url.startsWith('#')) {
      const el = document.querySelector(url);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // FEATURED ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Selected software development, responsive web architectures, IoT automation, and AI-assisted web applications with verified codebases.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((proj, idx) => {
            const isFeatured = proj.featured;

            return (
              <div
                key={proj.id}
                className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/70 border ${
                  isFeatured
                    ? 'border-emerald-500/40 shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                    : 'border-slate-800/90 hover:border-cyan-500/40'
                } backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Subtle top glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 ${
                  isFeatured ? 'bg-emerald-500/10' : 'bg-cyan-500/5'
                } rounded-full blur-2xl pointer-events-none`} />

                <div>
                  {/* Card Top Row: Badge & Index */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getProjectIcon(proj.id, proj.title)}
                      </div>
                      {proj.badge && (
                        <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium ${
                          isFeatured
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                            : 'bg-cyan-500/10 border border-cyan-500/25 text-cyan-300'
                        }`}>
                          {proj.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                    {proj.title}
                  </h3>
                  {proj.subtitle && (
                    <p className="text-xs font-mono text-purple-300/90 mb-3">
                      {proj.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5 font-normal">
                    {proj.description}
                  </p>

                  {/* Key Highlight Bullets */}
                  {proj.features && (
                    <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-slate-950/50 border border-slate-800/70">
                      {proj.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-emerald-400' : 'text-cyan-400'
                          }`} />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies List */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Links & Details */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer min-h-[38px]"
                  >
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Architecture Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all hover:scale-105 min-h-[38px]"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}

                    {proj.id === 'proj-todo' ? (
                      <button
                        onClick={() => setShowTodoDemo(true)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold transition-all hover:scale-105 shadow-md shadow-emerald-500/20 cursor-pointer min-h-[38px]"
                      >
                        <CheckSquare className="w-3.5 h-3.5 text-slate-950" />
                        <span>Try Live App</span>
                      </button>
                    ) : proj.liveDemoUrl ? (
                      <button
                        onClick={() => handleLiveDemoClick(proj)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all hover:scale-105 shadow-md shadow-cyan-500/20 cursor-pointer min-h-[38px]"
                      >
                        <span>Live View</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d24] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  {getProjectIcon(selectedProject.id, selectedProject.title)}
                </div>
                <div>
                  {selectedProject.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 text-[10px] font-mono mb-1 inline-block">
                      {selectedProject.badge}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.subtitle && (
                    <p className="text-xs font-mono text-purple-300">
                      {selectedProject.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Features */}
              {selectedProject.features && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-3">
                    Architectural &amp; Implementation Highlights
                  </h4>
                  <div className="space-y-2.5">
                    {selectedProject.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Technologies &amp; Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                )}
                {selectedProject.id === 'proj-todo' ? (
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setShowTodoDemo(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Launch Live Interactive Simulator</span>
                  </button>
                ) : selectedProject.liveDemoUrl ? (
                  <button
                    onClick={() => {
                      const proj = selectedProject;
                      setSelectedProject(null);
                      handleLiveDemoClick(proj);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <span>{selectedProject.id === 'proj-4' ? 'Jump to Gallery' : 'Open Link'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive To-Do List Simulator Modal (Demonstrating Bolt.new / Lovable + localStorage) */}
      {showTodoDemo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setShowTodoDemo(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-[#090e24] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono mb-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>BROWSER LOCALSTORAGE SIMULATOR</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    To-Do List Web Application
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowTodoDemo(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tech Info Pill */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 mb-5 font-mono">
              <span className="text-emerald-400 font-semibold">Live Persistence:</span> Any tasks you add or toggle here are saved immediately to your browser's <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">localStorage</code>.
            </div>

            {/* Input Form */}
            <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add a new task (e.g. Test mobile responsiveness)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-md shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
              <div className="flex gap-1">
                {(['all', 'active', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTodoFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-colors cursor-pointer ${
                      todoFilter === filter
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                onClick={handleResetTodos}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                title="Reset sample tasks"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Task Items List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 mb-5">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 font-mono">
                  No tasks matching the selected filter.
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group"
                  >
                    <button
                      onClick={() => handleToggleTodo(todo.id)}
                      className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        todo.completed
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'border-slate-700 bg-slate-900 group-hover:border-emerald-500/50'
                      }`}>
                        {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-xs ${
                        todo.completed
                          ? 'line-through text-slate-500'
                          : 'text-slate-200 font-medium'
                      }`}>
                        {todo.text}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-500">
                {todos.filter(t => !t.completed).length} items remaining
              </span>
              <button
                onClick={() => setShowTodoDemo(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
