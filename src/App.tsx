/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Share2, 
  Phone, 
  MessageCircle, 
  UserPlus, 
  Copy, 
  QrCode, 
  Download, 
  X,
  Check
} from "lucide-react";

export default function App() {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const profile = {
    name: "الأستاذ الدكتور / محمد علي",
    title: "خبير الاستشارات التعليمية والتربوية",
    description: "نساعدكم في بناء مستقبل تعليمي مشرق من خلال استشارات متخصصة وحلول تربوية مبتكرة.",
    phone: "+966500000000",
    email: "info@professor.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
    website: window.location.href
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: profile.title,
          url: profile.website,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:${profile.title}
TEL;TYPE=CELL:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
END:VCARD`;
    
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${profile.name}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/${profile.phone.replace(/\+/g, "")}`;

  return (
    <div className="min-h-[100dvh] w-full relative selection:bg-blue-100 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-display" dir="rtl">
      <div className="premium-bg" />
      
      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8 md:p-10 flex flex-col items-center text-center"
      >
        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-6 right-6 p-2 bg-slate-100/80 rounded-full text-slate-600 hover:bg-slate-200 transition-colors z-20"
        >
          <Share2 size={18} />
        </button>

        {/* Profile Section */}
        <div className="relative mb-6">
          <div className="profile-image-container">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          {/* Status Indicator */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md z-20">
            <div className="status-dot" />
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-8 space-y-1 relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">
            {profile.name}
          </h1>
          <p className="text-lg font-semibold text-slate-600">
            {profile.title}
          </p>
          <p className="text-sm text-slate-500 max-w-[280px] mx-auto leading-relaxed mt-4">
            {profile.description}
          </p>
          
          <div className="pt-6 flex items-center justify-center gap-2 opacity-10">
            <div className="h-[1px] w-10 bg-slate-900" />
            <div className="w-1 h-1 rounded-full bg-slate-900" />
            <div className="h-[1px] w-10 bg-slate-900" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4 relative z-10">
          <motion.a 
            href={`tel:${profile.phone}`}
            animate={pulseAnimation}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(30, 64, 175, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-royal-blue py-4 rounded-3xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg"
          >
            <Phone size={20} className="shrink-0" />
            <span>اتصل بي الآن</span>
          </motion.a>

          <motion.a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            animate={pulseAnimation}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-whatsapp-green py-4 rounded-3xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg"
          >
            <div className="pulse-dot" />
            <span>تواصل عبر واتساب</span>
            <MessageCircle size={22} className="shrink-0" />
          </motion.a>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleCopyLink}
              className="btn-light-gray py-4 rounded-3xl flex flex-col items-center justify-center gap-2 font-bold text-sm shadow-sm"
            >
              {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} className="text-blue-500" />}
              <span>{copied ? "تم النسخ!" : "نسخ الرقم"}</span>
            </button>

            <button 
              onClick={handleDownloadVCard}
              className="btn-light-gray py-4 rounded-3xl flex flex-col items-center justify-center gap-2 font-bold text-sm shadow-sm"
            >
              <UserPlus size={20} className="text-blue-500" />
              <span>حفظ الجهة</span>
            </button>
          </div>

          <motion.button 
            onClick={() => setShowQR(true)}
            animate={pulseAnimation}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(184, 134, 11, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-gold py-4 rounded-3xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg"
          >
            <QrCode size={22} className="shrink-0" />
            <span>مسح رمز QR للتواصل</span>
          </motion.button>
        </div>

        {/* Footer */}
        <footer className="mt-10 relative z-10">
          <p className="text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase">
            Digital Profile 2026
          </p>
        </footer>
      </motion.main>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white w-full max-w-xs rounded-[48px] p-8 relative shadow-2xl text-center"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-6 left-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mt-4 mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">رمز QR الخاص بي</h2>
                <p className="text-xs text-slate-500">امسح الرمز ضوئياً لحفظ جهة الاتصال</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-[40px] mb-6 flex items-center justify-center border border-slate-100">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(profile.website)}&color=0f172a&bgcolor=f8fafc`} 
                  alt="QR Code" 
                  className="w-44 h-44"
                />
              </div>

              <button 
                onClick={handleDownloadVCard}
                className="w-full bg-slate-900 text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 text-sm shadow-lg"
              >
                <Download size={18} />
                <span>تحميل بطاقة العمل</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
