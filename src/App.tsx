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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.4,
      repeat: 1, // Runs twice (0.8s total), then stops for performance
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen w-full relative selection:bg-blue-100 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden" dir="rtl">
      <div className="premium-bg" />
      <div className="aurora-light" />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card w-full max-w-lg p-10 md:p-14 flex flex-col items-center text-center font-sans"
      >
        {/* Premium Decorative Layers */}
        <div className="card-pattern" />
        <div className="glass-reflection" />
        
        {/* Decorative Borders */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/20 rounded-tl-[64px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-[64px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-[64px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/20 rounded-br-[64px] pointer-events-none" />
        
        {/* Share Button with Floating Animation */}
        <button 
          onClick={handleShare}
          className="absolute top-10 right-10 p-3 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full text-white hover:scale-110 transition-transform shadow-xl border border-white/20 z-20 float-animation"
        >
          <Share2 size={20} />
        </button>

        {/* Profile Section with Static Glow */}
        <div className="relative mb-10 mt-2">
          <div className="avatar-glow" />
          <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden z-10">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Status Indicator */}
          <div className="absolute bottom-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md z-20">
            <div className="w-4 h-4 bg-emerald-500 rounded-full" />
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-12 space-y-2 relative z-10">
          <h1 className="text-4xl font-display font-black text-white leading-tight tracking-tight gold-gradient-text">
            {profile.name}
          </h1>
          <p className="text-xl font-bold text-gray-100 tracking-wide">
            {profile.title}
          </p>
          <p className="text-sm text-gray-300 max-w-[340px] mx-auto leading-relaxed mt-6 font-medium">
            {profile.description}
          </p>
          
          <div className="pt-8 flex items-center justify-center gap-3 opacity-20">
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-5 relative z-10">
          <motion.a 
            href={`tel:${profile.phone}`}
            animate={pulseAnimation}
            className="w-full btn-glass-royal btn-glow-gold text-white py-5 rounded-[28px] flex items-center justify-center gap-4 font-bold text-xl"
          >
            <Phone size={22} className="shrink-0" />
            <span>اتصل بي الآن</span>
          </motion.a>

          <motion.a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            animate={pulseAnimation}
            className="w-full btn-glass-emerald btn-glow-gold text-white py-5 rounded-[28px] flex items-center justify-center gap-4 font-bold text-xl relative"
          >
            <MessageCircle size={24} className="shrink-0" />
            <div className="flex items-center gap-2">
              <span>تواصل عبر واتساب</span>
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            </div>
          </motion.a>

          <div className="grid grid-cols-2 gap-5">
            <motion.button 
              onClick={handleDownloadVCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 text-white py-6 rounded-[28px] flex flex-col items-center justify-center gap-3 font-bold text-base shadow-sm hover:bg-white/20 transition-colors"
            >
              <UserPlus size={22} className="text-[#D4AF37]" />
              <span>حفظ الجهة</span>
            </motion.button>

            <motion.button 
              onClick={handleCopyLink}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 text-white py-6 rounded-[28px] flex flex-col items-center justify-center gap-3 font-bold text-base shadow-sm hover:bg-white/20 transition-colors"
            >
              {copied ? <Check size={22} className="text-emerald-400" /> : <Copy size={22} className="text-[#D4AF37]" />}
              <span>{copied ? "تم النسخ!" : "نسخ الرقم"}</span>
            </motion.button>
          </div>

          <motion.button 
            onClick={() => setShowQR(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white py-5 rounded-[28px] flex items-center justify-center gap-4 font-bold text-xl shadow-xl border border-white/20"
          >
            <QrCode size={24} className="shrink-0" />
            <span>مسح رمز QR للتواصل</span>
          </motion.button>
        </div>

        {/* Footer */}
        <footer className="mt-14 relative z-10">
          <p className="text-[11px] text-gray-400 font-black tracking-[0.4em] uppercase mb-4">
            Digital Profile 2026
          </p>
          <p className="text-[9px] text-gray-400/60 max-w-[200px] mx-auto leading-tight">
            هذه بطاقة رقمية تفاعلية. جميع الحقوق محفوظة.
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-900 w-full max-w-sm rounded-[56px] p-10 relative shadow-2xl text-center border border-white/10"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-8 left-8 p-2.5 bg-white/5 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
              >
                <X size={22} />
              </button>

              <div className="mt-6 mb-8">
                <h2 className="text-2xl font-display font-black text-white mb-3">رمز QR الخاص بي</h2>
                <p className="text-sm text-gray-400">امسح الرمز ضوئياً لحفظ جهة الاتصال مباشرة</p>
              </div>

              <div className="bg-white/5 p-8 rounded-[40px] mb-8 flex items-center justify-center border border-white/5">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profile.website)}&color=ffffff&bgcolor=111827`} 
                  alt="QR Code" 
                  className="w-52 h-52"
                />
              </div>

              <button 
                onClick={handleDownloadVCard}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white py-4 rounded-[24px] font-bold flex items-center justify-center gap-3 shadow-md"
              >
                <Download size={22} />
                <span>تحميل بطاقة العمل</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
