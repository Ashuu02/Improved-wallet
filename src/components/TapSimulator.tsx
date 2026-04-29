import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Wifi, Smartphone, Linkedin, Instagram, Github } from "lucide-react";

interface TapSimulatorProps {
  activeProfile: string;
  onClose: () => void;
}

export default function TapSimulator({ activeProfile, onClose }: TapSimulatorProps) {
  const [status, setStatus] = useState<"idle" | "tapping" | "success">("idle");

  useEffect(() => {
    // Simulate the sequence
    const t1 = setTimeout(() => {
      setStatus("tapping");
      if (navigator.vibrate) navigator.vibrate([20, 10, 20]);
    }, 800);
    
    const t2 = setTimeout(() => {
      setStatus("success");
      if (navigator.vibrate) navigator.vibrate(50);
    }, 3200);
    
    const t3 = setTimeout(onClose, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/70 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] p-8 flex flex-col items-center text-center border border-white"
      >
        {/* Phone Notch/Bezel mockup feel */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-slate-100 rounded-full" />

        <div className="mt-8 mb-6">
          <div className="relative">
            {status === "tapping" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-blue-500"
              />
            )}
            
            <motion.div
              animate={{
                y: status === "tapping" ? [0, -15, 0] : 0,
                rotate: status === "tapping" ? [0, -5, 5, 0] : 0
              }}
              transition={{ repeat: status === "tapping" ? Infinity : 0, duration: 2 }}
              className="bg-white border border-slate-100 p-8 rounded-full shadow-sm"
            >
              <Smartphone size={64} className={status === "success" ? "text-green-500" : "text-slate-200"} />
            </motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-slate-900">Ready to Tap</h2>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Hold your device near another phone to share your <span className="font-semibold text-slate-900 underline decoration-blue-500 uppercase">{activeProfile}</span> pass.
              </p>
            </motion.div>
          )}

          {status === "tapping" && (
            <motion.div
              key="tapping"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <Wifi size={16} className="animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-widest">Connecting...</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Approaching</h2>
              <p className="text-slate-500 mt-2 text-sm">Haptic handshake in progress</p>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              <div className="relative mb-10 w-full flex justify-center">
                {/* Connection Glow Effect */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 2, opacity: [0, 0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`absolute inset-0 blur-3xl opacity-30 rounded-full ${
                    activeProfile === 'linkedin' ? 'bg-blue-400' : 
                    activeProfile === 'instagram' ? 'bg-pink-400' : 'bg-slate-400'
                  }`}
                />

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-50 z-10 flex flex-col items-center"
                >
                  <div className={`p-4 rounded-xl mb-4 ${
                    activeProfile === 'linkedin' ? 'bg-[#0077B5]' : 
                    activeProfile === 'instagram' ? 'bg-[#E4405F]' : 'bg-[#181717]'
                  }`}>
                    {activeProfile === 'linkedin' && <Linkedin size={40} className="text-white" />}
                    {activeProfile === 'instagram' && <Instagram size={40} className="text-white" />}
                    {activeProfile === 'github' && <Github size={40} className="text-white" />}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Connected on {activeProfile === 'linkedin' ? 'LinkedIn' : activeProfile}</h2>
                  
                </motion.div>
              </div>

              <div className="bg-slate-50 w-full p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">Alex Rivera</p>
                  <p className="text-[10px] text-slate-500 font-medium">Software Engineer • Applied Minds</p>
                </div>
                <div className="ml-auto">
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
              </div>
              
              <div className="mt-8 w-full">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl active:scale-95 transition-transform shadow-lg shadow-slate-200"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status !== "success" && (
          <button
            onClick={onClose}
            className="mt-8 text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </motion.div>
    </div>
  );
}
