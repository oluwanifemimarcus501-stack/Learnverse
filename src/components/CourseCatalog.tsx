import React, { useState } from 'react';
import { Search, Star, Clock, Users, Bookmark, Sparkles, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { Course, Category, Difficulty, UserProfile } from '../types';

interface CourseCatalogProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onToggleBookmark: (courseId: string) => void;
  user: UserProfile;
  setActiveTab: (tab: 'catalog' | 'viewer' | 'tutor' | 'generator' | 'dashboard') => void;
}

const CATEGORIES: Category[] = ['All', 'Computer Science', 'AI & ML', 'Quantum Physics', 'Neuroscience', 'Philosophy', 'Astrophysics'];

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  onSelectCourse,
  onToggleBookmark,
  user,
  setActiveTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedLevel, setSelectedLevel] = useState<Difficulty | 'All'>('All');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/80 via-purple-900/60 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 top-10 opacity-10 hidden lg:block">
          <Sparkles className="w-64 h-64 text-indigo-400" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-500/40 px-3.5 py-1.5 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>AI-Enhanced Masterclasses</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Expand Your Mind with <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">LearnVerse</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore world-class interactive courses in AI, Quantum Physics, Neuroscience, and Philosophy. Backed by intelligent AI tutoring and instant course creation.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('generator')}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Create AI Course</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('tutor')}
              className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-sm transition-all"
            >
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLevel === level
                    ? 'bg-slate-800 text-indigo-400 border border-indigo-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          const isBookmarked = user.bookmarkedCourses.includes(course.id);
          const isCompleted = user.completedCourses.includes(course.id);

          return (
            <div
              key={course.id}
              className="group bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div>
                {/* Course Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-slate-800">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow">
                    {course.category}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(course.id);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md border transition-all ${
                      isBookmarked
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
                  </button>

                  {/* Completed Badge */}
                  {isCompleted && (
                    <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-lg text-emerald-300 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                    </span>
                    <span className="flex items-center space-x-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Footer Action */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                <span className="text-xs font-semibold text-slate-400">
                  By <span className="text-slate-200">{course.author}</span>
                </span>
                <button
                  onClick={() => onSelectCourse(course)}
                  className="flex items-center space-x-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all"
                >
                  <span>{isCompleted ? 'Review Course' : 'Start Learning'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20 space-y-4 bg-slate-900/40 rounded-3xl border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No courses found</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            We couldn't find any courses matching your search. Try another query or create your own custom course using AI Studio!
          </p>
          <button
            onClick={() => setActiveTab('generator')}
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Course with AI</span>
          </button>
        </div>
      )}
    </div>
  );
};
