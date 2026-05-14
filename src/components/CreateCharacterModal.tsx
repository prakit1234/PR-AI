import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, Sparkles, UserCircle } from 'lucide-react';
import { Character } from '../types';

interface CreateCharacterModalProps {
  onClose: () => void;
  onSave: (character: Character) => void;
}

export default function CreateCharacterModal({ onClose, onSave }: CreateCharacterModalProps) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [prompt, setPrompt] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !prompt) return;

    onSave({
      id: `custom-${Date.now()}`,
      name,
      description: desc || `A unique presence named ${name}.`,
      avatar,
      systemPrompt: prompt,
      theme: 'from-gold-500/10 to-noir-900',
      isCustom: true
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl bg-noir-950 border border-white/5 relative shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-gold-500/50" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold-500/50" />

        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif text-white tracking-widest uppercase">The Manifestation</h2>
            <p className="font-script text-xl text-gold-500/60 leading-none lowercase">Define a new essence</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/20 hover:text-white transition-colors">
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10 overflow-y-auto custom-scrollbar">
          <div className="flex gap-12 flex-col md:flex-row">
            <div className="space-y-6">
              <label className="block text-[10px] font-sans uppercase tracking-[0.5em] text-white/30">Vessel</label>
              <div className="relative group">
                <img src={avatar} className="w-40 h-56 object-cover border border-white/5 group-hover:border-gold-500/30 transition-all duration-700" alt="Preview" />
              </div>
              <input 
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Image Source"
                className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-xs font-serif italic text-white placeholder:text-white/10 focus:outline-none focus:border-gold-500/50 transition-all"
              />
            </div>

            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-sans uppercase tracking-[0.5em] text-white/30">Incantation Name</label>
                <input 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lysander"
                  className="w-full bg-transparent border-b border-white/10 px-0 py-4 font-serif text-2xl italic text-white placeholder:text-white/5 focus:outline-none focus:border-gold-500/50 transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-sans uppercase tracking-[0.5em] text-white/30">Brief Description</label>
                <input 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="A whisper of their past..."
                  className="w-full bg-transparent border-b border-white/10 px-0 py-4 font-serif text-lg italic text-white/60 placeholder:text-white/5 focus:outline-none focus:border-gold-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="block text-[10px] font-sans uppercase tracking-[0.5em] text-white/30">Soul Directives</label>
            <textarea 
              required
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How shall they exist within this link? Define their voice, their desires, and their secrets..."
              className="w-full bg-transparent border border-white/10 p-6 font-serif text-lg italic text-white/80 placeholder:text-white/5 focus:outline-none focus:border-gold-500/30 transition-all resize-none min-h-[160px]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-6 bg-transparent border border-white/10 text-white font-serif text-xl italic hover:border-gold-500 transition-all duration-700 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <span className="relative z-10">Manifest Presence</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
