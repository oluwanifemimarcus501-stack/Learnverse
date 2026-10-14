import React from 'react';
import { Award, Flame, Bookmark, CheckCircle2, Trophy, ArrowRight, User } from 'lucide-react';
import { UserProfile, Course } from '../types';

interface DashboardProps {
  user: UserProfile;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenCertificate: (course: Course) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, courses, onSelectCourse, onOpenCertificate }) => {
  const completedCoursesList = courses.filter(c => user.completedCourses.includes(c.id));
  const bookmarkedCoursesList = courses.filter(c => user.bookmarkedCourses.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-500/50 shadow-lg">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>
            <p className="text-xs text-indigo-400 font-medium">Senior Scholar at LearnVerse Academy</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center min-w-[110px]">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 mx-auto mb-1" />
            <span className="text-xl font-extrabold text-white">{user.streak}</span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Day Streak</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center min-w-[110px]">
            <Trophy className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
            <span className="text-xl font-extrabold text-white">{user.xp}</span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Total XP</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center min-w-[110px]">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-xl font-extrabold text-white">{user.completedCourses.length}</span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Completed</span>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-indigo-400" />
          <span>Achievements & Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-6 rounded-3xl border flex items-center space-x-4 transition-all ${
                badge.earned
                  ? 'bg-slate-900 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="text-4xl p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow">
                {badge.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">{badge.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  badge.earned ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {badge.earned ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses & Certificates */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Completed Courses & Certificates</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCoursesList.map((course) => (
            <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full">
                    Completed
                  </span>
                  <span className="text-xs text-slate-400">{course.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{course.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{course.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => onOpenCertificate(course)}
                  className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
                <button
                  onClick={() => onSelectCourse(course)}
                  className="text-xs text-slate-400 hover:text-white font-semibold flex items-center space-x-1"
                >
                  <span>Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {completedCoursesList.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400">
              <p className="text-sm">You haven't completed any courses yet. Finish your first course to earn certificates!</p>
            </div>
          )}
        </div>
      </div>

      {/* Bookmarked Courses */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Bookmark className="w-5 h-5 text-indigo-400" />
          <span>Bookmarked Courses</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedCoursesList.map((course) => (
            <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full">
                  {course.category}
                </span>
                <h3 className="text-lg font-bold text-white">{course.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{course.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400">{course.level}</span>
                <button
                  onClick={() => onSelectCourse(course)}
                  className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
