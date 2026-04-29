import { motion } from "motion/react";
import { Linkedin, Instagram, Github, CreditCard } from "lucide-react";

export type PassType = "linkedin" | "instagram" | "github" | "credit";

interface PassCardProps {
  type: PassType;
  isSelected?: boolean;
  onClick?: () => void;
  isDimmed?: boolean;
  key?: string; // Add key to satisfy strict linter checks in some environments
}

export default function PassCard({ type, isSelected, onClick, isDimmed }: PassCardProps) {
  const configs = {
    linkedin: {
      color: "#0077B5",
      label: "LinkedIn",
      icon: Linkedin,
      gradient: "from-[#0077B5] to-[#00A0DC]",
    },
    instagram: {
      color: "#E4405F",
      label: "Instagram",
      icon: Instagram,
      gradient: "from-[#833AB4] via-[#FD1D1D] to-[#FCB045]",
    },
    github: {
      color: "#181717",
      label: "GitHub",
      icon: Github,
      gradient: "from-[#24292F] to-[#181717]",
    },
    credit: {
      color: "#ffffff",
      label: "Platinum",
      icon: CreditCard,
      gradient: "from-[#FDFEFF] via-[#BDC3C7] to-[#2C3E50]",
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      onClick={onClick}
      initial={false}
      animate={{
        scale: isSelected ? 1.02 : 1,
        y: isSelected ? -8 : 0,
        opacity: isDimmed ? 0.4 : 1,
        zIndex: isSelected ? 10 : 0
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full aspect-[1.58/1] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-shadow ${
        isSelected ? 'shadow-blue-500/20 ring-2 ring-white/50' : 'shadow-black/10'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
            <Icon size={24} />
          </div>
          {type !== 'credit' && (
            <span className="text-xs font-semibold tracking-widest uppercase opacity-70">SocialPass</span>
          )}
          {type === 'credit' && (
             <div className="flex flex-col items-end opacity-40">
               <div className="w-8 h-5 rounded-sm bg-white/30 border border-white/20" />
               <span className="text-[8px] font-bold mt-1 uppercase tracking-tighter">NFC ACTIVE</span>
             </div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold tracking-tight">{config.label}</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mt-0.5">
            {type === 'credit' ? 'American Express' : 'Tap to share profile'}
          </p>
        </div>
      </div>

      {isSelected && (
        <motion.div
          layoutId="glow"
          className="absolute inset-0 ring-4 ring-blue-400 ring-offset-2 ring-offset-transparent rounded-2xl opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.div>
  );
}
