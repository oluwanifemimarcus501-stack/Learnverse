import React, { useState } from 'react';
import { INITIAL_COURSES, INITIAL_USER } from './data/mockCourses';
import { Course, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseViewer } from './components/CourseViewer';
import { AiTutorChat } from './components/AiTutorChat';
import { CourseGenerator } from './components/CourseGenerator';
import { Dashboard } from './components/Dashboard';
import { CertificateModal } from './components/CertificateModal';

export default function App() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<'catalog' | 'viewer' | 'tutor' | 'generator' | 'dashboard'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [tutorContext, setTutorContext] = useState<string>('');
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('viewer');
  };

  const handleToggleBookmark = (courseId: string) => {
    setUser(prev => {
      const isBookmarked = prev.bookmarkedCourses.includes(courseId);
      return {
        ...prev,
        bookmarkedCourses: isBookmarked
          ? prev.bookmarkedCourses.filter(id => id !== courseId)
          : [...prev.bookmarkedCourses, courseId]
      };
    });
  };

  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id !== courseId) return course;

        const updatedChapters = course.chapters.map(ch => ({
          ...ch,
          lessons: ch.lessons.map(l => (l.id === lessonId ? { ...l, completed: true } : l))
        }));

        const allLessons = updatedChapters.flatMap(ch => ch.lessons);
        const isAllDone = allLessons.every(l => l.completed);

        if (isAllDone && !user.completedCourses.includes(courseId)) {
          setUser(u => ({
            ...u,
            xp: u.xp + 250,
            completedCourses: [...u.completedCourses, courseId]
          }));
        }

        return { ...course, chapters: updatedChapters };
      })
    );

    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse(prev => {
        if (!prev) return null;
        const updatedChapters = prev.chapters.map(ch => ({
          ...ch,
          lessons: ch.lessons.map(l => (l.id === lessonId ? { ...l, completed: true } : l))
        }));
        return { ...prev, chapters: updatedChapters };
      });
    }

    // Add XP for lesson completion
    setUser(u => ({ ...u, xp: u.xp + 50 }));
  };

  const handleCourseGenerated = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
    // Unlock AI Architect badge
    setUser(u => ({
      ...u,
      xp: u.xp + 300,
      badges: u.badges.map(b => (b.id === 'b-4' ? { ...b, earned: true } : b))
    }));
  };

  const handleOpenTutorWithContext = (context: string) => {
    setTutorContext(context);
    setActiveTab('tutor');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'catalog' && (
          <CourseCatalog
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onToggleBookmark={handleToggleBookmark}
            user={user}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'viewer' && selectedCourse && (
          <CourseViewer
            course={selectedCourse}
            onBack={() => setActiveTab('catalog')}
            onCompleteLesson={handleCompleteLesson}
            onFinishCourse={(id) => {
              if (!user.completedCourses.includes(id)) {
                setUser(u => ({ ...u, completedCourses: [...u.completedCourses, id] }));
              }
            }}
            onOpenTutorWithContext={handleOpenTutorWithContext}
            onOpenCertificate={(c) => setCertificateCourse(c)}
          />
        )}

        {activeTab === 'tutor' && (
          <AiTutorChat initialContext={tutorContext} />
        )}

        {activeTab === 'generator' && (
          <CourseGenerator
            onCourseGenerated={handleCourseGenerated}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            user={user}
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onOpenCertificate={(c) => setCertificateCourse(c)}
          />
        )}
      </main>

      {/* Certificate Modal */}
      {certificateCourse && (
        <CertificateModal
          course={certificateCourse}
          user={user}
          onClose={() => setCertificateCourse(null)}
        />
      )}
    </div>
  );
}
