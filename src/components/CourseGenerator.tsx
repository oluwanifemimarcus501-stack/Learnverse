import React, { useState } from 'react';
import { Sparkles, BookOpen, ArrowRight, Loader2, Wand2, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';

interface CourseGeneratorProps {
  onCourseGenerated: (newCourse: Course) => void;
  onSelectCourse: (course: Course) => void;
}

const SAMPLE_TOPICS = [
  "Game Theory & Strategic Decision Making",
  "CRISPR Gene Editing & Bioethics",
  "The Architecture of Large Language Models",
  "Renaissance Art History & Optics",
  "Special Relativity & Spacetime Diagrams"
];

export const CourseGenerator: React.FC<CourseGeneratorProps> = ({ onCourseGenerated, onSelectCourse }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const LOADING_MESSAGES = [
    "Analyzing curriculum and learning objectives...",
    "Drafting core chapters and detailed lessons...",
    "Formulating interactive knowledge check quizzes...",
    "Polishing markdown formatting and illustrations...",
    "Finalizing your AI-generated masterclass!"
  ];

  const handleGenerate = async (topicToUse?: string) => {
    const targetTopic = topicToUse || topic;
    if (!targetTopic.trim() || isGenerating) return;

    setIsGenerating(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev));
    }, 2500);

    try {
      const response = await fetch('/api/generate-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: targetTopic })
      });

      const data = await response.json();
      if (data.course) {
        const fullCourse: Course = {
          id: `gen-${Date.now()}`,
          title: data.course.title || targetTopic,
          description: data.course.description || `An advanced AI-generated masterclass on ${targetTopic}.`,
          category: data.course.category || 'Computer Science',
          level: data.course.level || 'Intermediate',
          duration: data.course.duration || '4 hours',
          image: data.course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
          author: 'Gemini AI Studio',
          rating: 5.0,
          enrolledCount: 1,
          chapters: data.course.chapters || []
        };

        setGeneratedCourse(fullCourse);
        onCourseGenerated(fullCourse);
      }
    } catch (error) {
      console.error('Failed to generate course:', error);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-500/40 px-4 py-1.5 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Wand2 className="w-4 h-4 text-amber-400" />
          <span>AI Course Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Generate Any Course Instantly with Gemini AI
        </h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Type any subject you want to master. Our AI will instantly build a tailored curriculum complete with chapters, lessons, and interactive quizzes.
        </p>
      </div>

      {!isGenerating && !generatedCourse && (
        <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl space-y-8 shadow-2xl">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300">What do you want to learn today?</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. Quantum Cryptography, Behavioral Economics, Astrobiology..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                disabled={!topic.trim()}
                onClick={() => handleGenerate()}
                className={`flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                  topic.trim()
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white cursor-pointer hover:scale-105'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Course</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or try one of these trending topics:</span>
            <div className="flex flex-wrap gap-2.5">
              {SAMPLE_TOPICS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(sample);
                    handleGenerate(sample);
                  }}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center space-y-6 shadow-2xl">
          <Loader2 className="w-14 h-14 text-indigo-500 animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Crafting Your Masterclass</h3>
            <p className="text-indigo-400 text-sm font-medium animate-pulse">
              {LOADING_MESSAGES[loadingStep]}
            </p>
          </div>
          <div className="w-full max-w-md mx-auto bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${((loadingStep + 1) / LOADING_MESSAGES.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Success State */}
      {generatedCourse && !isGenerating && (
        <div className="bg-slate-900 border border-emerald-500/40 p-8 sm:p-10 rounded-3xl space-y-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Course Successfully Generated!</span>
            <h2 className="text-2xl font-extrabold text-white">{generatedCourse.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{generatedCourse.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => onSelectCourse(generatedCourse)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setGeneratedCourse(null);
                setTopic('');
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-6 py-3.5 rounded-2xl text-xs transition-all"
            >
              Generate Another Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
