import React from 'react';
import { Award, X, Download, GraduationCap } from 'lucide-react';
import { Course, UserProfile } from '../types';

interface CertificateModalProps {
  course: Course;
  user: UserProfile;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ course, user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border-2 border-indigo-500/40 rounded-3xl max-w-3xl w-full p-8 sm:p-12 space-y-8 shadow-2xl overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Card Content */}
        <div className="border-8 border-double border-indigo-500/30 p-8 sm:p-10 rounded-2xl bg-slate-950 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400 shadow-lg">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">LearnVerse Academy</span>
            <h2 className="text-3xl font-extrabold text-white">Certificate of Completion</h2>
          </div>

          <p className="text-slate-400 text-sm">This is proudly presented to</p>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            {user.name}
          </h3>

          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            for successfully mastering all curriculum requirements and knowledge checks in the masterclass:
          </p>

          <h4 className="text-xl font-bold text-white bg-slate-900 py-3 px-6 rounded-2xl border border-slate-800 inline-block">
            {course.title}
          </h4>

          <div className="flex items-center justify-between pt-8 border-t border-slate-800 text-xs text-slate-400">
            <div>
              <p className="font-bold text-white">Dr. Elena Vance</p>
              <p>Academic Dean, LearnVerse</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-white">{new Date().toLocaleDateString()}</p>
              <p>Verified Credential</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-6 py-3 rounded-xl text-xs transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
