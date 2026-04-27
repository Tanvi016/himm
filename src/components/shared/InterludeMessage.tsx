import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InterludeMessage: React.FC = () => {
    // We can just keep appending to a list of messages based on time.
    const [step, setStep] = useState(0);

    const handleViewportEnter = () => {
       if (step > 0) return;
       
       setStep(1); // Show "I was thinking..."
       
       setTimeout(() => {
           setStep(2); // Add typing dots below it
           
           setTimeout(() => {
               setStep(3); // Remove dots, show final message
           }, 2000); // 2 seconds of typing
       }, 1500); // Hold first message for 1.5s
    };

    return (
       <div className="py-20 md:py-32 w-full flex justify-center items-center relative z-20 px-4">
             <motion.div 
               onViewportEnter={handleViewportEnter}
               viewport={{ once: true, margin: "-100px" }}
               className="w-full max-w-md bg-black rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-[8px] border-[#1C1C1E] overflow-hidden relative ring-1 ring-white/10"
            >
               {/* iMessage Header */}
               <div className="bg-[#1C1C1E]/90 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                  <div className="text-blue-500 text-3xl leading-none">&lsaquo;</div>
                  <div className="flex flex-col items-center">
                     <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full mb-1 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        T
                     </div>
                     <span className="text-[11px] font-bold text-white uppercase tracking-widest opacity-90">Tanvi</span>
                  </div>
                  <div className="w-6"></div>
               </div>

               {/* iMessage Chat Body */}
               <div className="px-5 py-6 flex flex-col items-start gap-2 min-h-[250px] bg-black font-sans text-[15px]">
                   
                   <AnimatePresence>
                       {step >= 1 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.9, transformOrigin: 'bottom left' }} 
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="bg-[#0B93F6] text-white px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%] leading-snug shadow-sm"
                          >
                             I was thinking...
                          </motion.div>
                       )}
                       
                       {step === 2 && (
                          <motion.div 
                            key="typing"
                            initial={{ opacity: 0, y: 10, scale: 0.9, transformOrigin: 'bottom left' }} 
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            className="bg-[#0B93F6] text-white px-5 py-3.5 rounded-2xl rounded-bl-sm max-w-[80%] flex items-center gap-1.5 shadow-sm"
                          >
                             <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                             <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                             <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </motion.div>
                       )}

                       {step >= 3 && (
                          <motion.div 
                            key="message"
                            initial={{ opacity: 0, y: 10, scale: 0.9, transformOrigin: 'bottom left' }} 
                            animate={{ opacity: 1, y: 0, scale: 1 }} 
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="bg-[#0B93F6] text-white px-4 py-2 rounded-2xl rounded-bl-sm max-w-[85%] leading-snug shadow-sm"
                          >
                             You look incredibly hot when you're completely focused on something. Just wanted to put that out there... ❤️‍🔥💋
                          </motion.div>
                       )}
                   </AnimatePresence>
               </div>
            </motion.div>
       </div>
    );
};

export default InterludeMessage;
