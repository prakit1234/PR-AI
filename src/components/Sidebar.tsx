import { motion } from 'motion/react';
import { Plus, MessageSquare, History, Settings, LogOut, User } from 'lucide-react';
import { Character, ChatSession } from '../types';
import { CHARACTERS } from '../constants';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSessionSelect: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ sessions, activeSessionId, onSessionSelect, onNewChat, onDeleteSession, onLogout }: SidebarProps) {
  return (
    <div className="w-full md:w-72 h-full border-r border-white/5 bg-noir-800 flex flex-col p-8 z-20">
      <div className="flex flex-col gap-1 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center font-serif text-gold-500 text-xl italic shadow-[0_0_15px_rgba(197,160,89,0.1)]">P</div>
          <h1 className="font-serif text-3xl text-white tracking-widest uppercase">Prai</h1>
        </div>
        <div className="h-px w-12 bg-gold-500/50 mt-2" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-medium font-sans">
          Library
        </h2>
        
        <div className="space-y-2">
          {sessions.length === 0 ? (
            <div className="py-8 text-white/10 text-[11px] uppercase tracking-widest font-serif italic border border-dashed border-white/5 flex items-center justify-center">
              The Archives are Empty
            </div>
          ) : (
            sessions.sort((a, b) => b.updatedAt - a.updatedAt).map((session) => {
              const character = CHARACTERS.find(c => c.id === session.characterId);
              return (
                <motion.button
                  key={session.id}
                  onClick={() => onSessionSelect(session.id)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "w-full p-4 transition-all duration-500 group relative",
                    activeSessionId === session.id 
                      ? "bg-white/[0.03]" 
                      : "hover:bg-white/[0.01]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={character?.avatar} 
                        className={cn(
                          "w-12 h-12 object-cover transition-all duration-700 grayscale brightness-75",
                          activeSessionId === session.id ? "grayscale-0 brightness-110" : "group-hover:grayscale-0 group-hover:brightness-100"
                        )} 
                        alt="" 
                      />
                      {activeSessionId === session.id && (
                        <div className="absolute inset-0 ring-1 ring-inset ring-gold-500/40" />
                      )}
                    </div>
                    <div className="text-left overflow-hidden">
                      <div className={cn(
                        "font-serif text-lg tracking-wide transition-colors",
                        activeSessionId === session.id ? "text-gold-400" : "text-white/40"
                      )}>
                        {character?.name}
                      </div>
                      <div className="text-[10px] text-white/10 truncate font-sans uppercase tracking-tighter">
                        Last entry recorded
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-white/10 hover:text-red-500/50 transition-all"
                  >
                    <LogOut size={12} className="rotate-90" />
                  </button>

                  {activeSessionId === session.id && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold-500 shadow-[0_0_8px_rgba(197,160,89,0.5)]" 
                    />
                  )}
                </motion.button>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-auto pt-8 space-y-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="w-full py-4 bg-transparent border border-white/5 flex items-center justify-center gap-3 hover:border-gold-500/30 transition-all group"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-white/30 group-hover:text-gold-400 transition-colors">Manifest New Connection</span>
        </motion.button>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-white/[0.02]">
              <img 
                src={auth.currentUser?.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${auth.currentUser?.uid}`} 
                alt="User" 
                className="w-full h-full object-cover grayscale opacity-30"
              />
            </div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-serif tracking-widest text-white/60 truncate max-w-[120px] uppercase">
                {auth.currentUser?.displayName || 'Seeker'}
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-white/20 hover:text-gold-500 transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
