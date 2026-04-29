import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Bell, Search, ArrowRight, Share2 } from "lucide-react";
import PassCard, { PassType } from "./components/PassCard";
import TapSimulator from "./components/TapSimulator";

export default function App() {
  const [selectedPass, setSelectedPass] = useState<PassType>("linkedin");
  const [isTapping, setIsTapping] = useState(false);
  const [userName, setUserName] = useState("Jane Doe");

  const passes: PassType[] = ["linkedin", "instagram", "github"];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-slate-100">
      {/* Header */}
      <header className="px-6 pt-10 pb-4 flex justify-between items-center bg-white sticky top-0 z-20">
        {/* Google Wallet Style Icon */}
        <div className="relative w-10 h-8 flex flex-col justify-end">
          <div className="absolute top-0 left-0 right-0 h-4 bg-yellow-400 rounded-t-lg -rotate-2 origin-bottom" />
          <div className="absolute top-1 left-0 right-0 h-4 bg-green-500 rounded-t-lg rotate-1 origin-bottom" />
          <div className="absolute top-2 left-0 right-0 h-4 bg-red-500 rounded-t-lg -rotate-1 origin-bottom" />
          <div className="relative h-5 bg-blue-600 rounded-lg z-10 flex items-center justify-center">
            <div className="w-4 h-0.5 bg-white/30 rounded-full" />
          </div>
        </div>

        {/* Circular Initial Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#0097A7] flex items-center justify-center border border-white/20">
          <span className="text-white font-medium text-lg">J</span>
        </div>
      </header>

      {/* Main Wallet Content */}
      <main className="px-6 pb-24">
        {/* Main Card Section (Stacked Wallet Style) */}
        <section className="mt-12 mb-16 relative px-2 group">
          {/* Background Card Stacks - Fanned Effect */}
          <motion.div 
            initial={false}
            animate={{ y: isTapping ? 0 : -24, scale: 0.92, rotate: -2 }}
            className="absolute inset-x-8 h-24 bg-gradient-to-br from-slate-800 to-black rounded-2xl border border-white/10 -z-20 shadow-lg transition-transform group-hover:-translate-y-2" 
          />
          <motion.div 
            initial={false}
            animate={{ y: isTapping ? 0 : -12, scale: 0.96, rotate: 1 }}
            className="absolute inset-x-5 h-24 bg-gradient-to-br from-amber-600/40 via-amber-700/40 to-amber-900/40 rounded-2xl border border-amber-500/20 -z-10 shadow-md transition-transform group-hover:-translate-y-1" 
          />
          
          <PassCard 
            type="credit" 
            isDimmed={isTapping} 
            onClick={() => {}} 
          />
        </section>

        {/* Social Passes Section */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Social Passes</h2>
              <p className="text-xs text-slate-500 mt-1">Tap a card to prepare for sharing</p>
            </div>
            <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <Plus size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {passes.map((type) => (
              <PassCard
                key={type}
                type={type}
                isSelected={selectedPass === type}
                isDimmed={isTapping && selectedPass !== type}
                onClick={() => {
                  setSelectedPass(type);
                  setIsTapping(true);
                }}
              />
            ))}
          </div>
        </section>

        {/* Quick Insights */}
        <section className="mt-12">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Connections</h3>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=friend${i}`} alt="" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  +12
                </div>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">NEW GROWTH</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium">Weekly Outreach</span>
              <span className="text-slate-900 font-bold">+24%</span>
            </div>
          </div>
        </section>
      </main>

      {/* Tap Overlay */}
      <AnimatePresence>
        {isTapping && (
          <TapSimulator 
            activeProfile={selectedPass} 
            onClose={() => setIsTapping(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
