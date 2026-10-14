import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, BookOpen, HelpCircle, Sparkles, Award, ArrowRight, Check } from 'lucide-react';
import { Course, Lesson } from '../types';

interface CourseViewerProps {
  course: Course;
  onBack: () => void;
  onCompleteLesson: (courseId: string, lessonId: string) => void;
  onFinishCourse: (courseId: string) => void;
  onOpenTutorWithContext: (context: string) => void;
  onOpenCertificate: (course: Course) => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  course,
  onBack,
  onCompleteLesson,
  onFinishCourse,
  onOpenTutorWithContext,
  onOpenCertificate,
}) => {
  // Find first uncompleted lesson or default to first lesson
  const allLessons = course.chapters.flatMap(ch => ch.lessons);
  const [currentLessonId, setCurrentLessonId] = useState<string>(allLessons[0]?.id || '');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [lessonId: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [lessonId: string]: boolean }>({});

  const currentLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);

  const isAllCompleted = allLessons.every(l => l.completed);

  const handleAnswerSelect = (lessonId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [lessonId]: optionIndex }));
  };

  const handleCheckQuiz = (lessonId: string) => {
    setShowExplanation(prev => ({ ...prev, [lessonId]: true }));
    onCompleteLesson(course.id, lessonId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
            {course.category}
          </span>
          {isAllCompleted && (
            <button
              onClick={() => onOpenCertificate(course)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Chapter Navigator */}
        <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 h-fit sticky top-28">
          <div>
            <h2 className="text-lg font-bold text-white mb-1 line-clamp-1">{course.title}</h2>
            <p className="text-xs text-slate-400">{course.duration} • {allLessons.length} Lessons</p>
          </div>

          <div className="space-y-6">
            {course.chapters.map((chapter, cIdx) => (
              <div key={cIdx} className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  {chapter.title}
                </h3>
                <div className="space-y-1.5 pl-2 border-l-2 border-slate-800">
                  {chapter.lessons.map((lesson) => {
                    const isSelected = lesson.id === currentLessonId;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonId(lesson.id)}
                        className={`w-full text-left flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                            : lesson.completed
                            ? 'text-emerald-400 hover:bg-slate-800/60'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="line-clamp-1">{lesson.title}</span>
                        {lesson.completed ? (
                          <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-400'} flex-shrink-0 ml-2`} />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Ask AI Tutor CTA */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => onOpenTutorWithContext(`Course: ${course.title}, Lesson: ${currentLesson.title}`)}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-white p-3 rounded-2xl text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI About This Lesson</span>
            </button>
          </div>
        </div>

        {/* Main Lesson Content */}
        <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400">Lesson {currentIndex + 1} of {allLessons.length}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{currentLesson.title}</h1>
            </div>

            <button
              onClick={() => onCompleteLesson(course.id, currentLesson.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentLesson.completed
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentLesson.completed ? 'Completed' : 'Mark as Complete'}</span>
            </button>
          </div>

          {/* Render Lesson Markdown-like Content */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed text-base">
            <div className="whitespace-pre-line bg-slate-950/50 p-6 sm:p-8 rounded-2xl border border-slate-800/80 font-sans">
              {currentLesson.content}
            </div>
          </div>

          {/* Lesson Quiz */}
          {currentLesson.quiz && (
            <div className="mt-10 bg-slate-950/80 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Knowledge Check</h3>
                  <p className="text-xs text-slate-400">Test your understanding of this lesson</p>
                </div>
              </div>

              <p className="text-white font-semibold text-base">
                {currentLesson.quiz.question}
              </p>

              <div className="space-y-3">
                {currentLesson.quiz.options.map((option, oIdx) => {
                  const isSelected = selectedAnswers[currentLesson.id] === oIdx;
                  const isCorrect = oIdx === currentLesson.quiz?.correctIndex;
                  const showResult = showExplanation[currentLesson.id];

                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={showResult}
                      onClick={() => handleAnswerSelect(currentLesson.id, oIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {showResult && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {!showExplanation[currentLesson.id] ? (
                <button
                  disabled={selectedAnswers[currentLesson.id] === undefined}
                  onClick={() => handleCheckQuiz(currentLesson.id)}
                  className={`px-6 py-3 rounded-xl font-bold text-xs shadow-lg transition-all ${
                    selectedAnswers[currentLesson.id] !== undefined
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-sm space-y-2">
                  <span className="font-bold text-indigo-300">Explanation:</span>
                  <p className="text-slate-300 text-xs leading-relaxed">{currentLesson.quiz.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Bottom Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentLessonId(allLessons[currentIndex - 1]?.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentIndex > 0 ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-900 text-slate-600 cursor-not-allowed'
              }`}
            >
              Previous Lesson
            </button>

            <button
              disabled={currentIndex === allLessons.length - 1}
              onClick={() => setCurrentLessonId(allLessons[currentIndex + 1]?.id)}
              className={`flex items-center space-x-1 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentIndex < allLessons.length - 1 ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-900 text-slate-600 cursor-not-allowed'
              }`}
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
