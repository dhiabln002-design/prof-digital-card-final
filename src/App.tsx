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

  const buttonVariants = {
    whileHover: { 
      scale: 1.05, 
      y: -5,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
    },
    whileTap: { scale: 0.95, y: 0 },
    transition: { type: "spring", stiffness: 300, damping: 15 }
  };

  return (
    <div className="min-h-screen w-full relative selection:bg-blue-100 flex flex-col items-center justify-center p-4 md:p-8" dir="rtl">
      <div className="premium-bg" />
      
      <motion.main 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card w-full max-w-lg rounded-[48px] p-10 md:p-14 flex flex-col items-center text-center font-sans"
      >
        {/* Animated Background Elements */}
        <div className="fluid-waves-container">
          <div className="fluid-wave" />
          <div className="fluid-wave" />
          <div className="fluid-wave" />
        </div>

        {/* Decorative Borders */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-200/30 rounded-tl-[48px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-blue-200/30 rounded-tr-[48px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-blue-200/30 rounded-bl-[48px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-200/30 rounded-br-[48px] pointer-events-none" />
        
        <div className="glass-shine" />

        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-10 right-10 p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-all shadow-sm border border-gray-200 hover:scale-110 active:scale-95 z-20"
        >
          <Share2 size={20} />
        </button>

        {/* Profile Section */}
        <div className="relative mb-10 mt-2">
          <div className="radial-glow" />
          <div className="relative w-36 h-36 rounded-full border-[5px] border-white/50 shadow-2xl overflow-hidden z-10">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Rotating Rings */}
          <div className="absolute -inset-3 border border-blue-200/20 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-5 border border-dashed border-blue-200/10 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />
          
          {/* Status Indicator */}
          <div className="absolute bottom-3 right-3 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-20">
            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-12 space-y-2 relative z-10">
          <h1 className="text-4xl font-display font-black text-black leading-tight tracking-tight">
            {profile.name}
          </h1>
          <p className="text-lg font-bold text-gray-800">
            {profile.title}
          </p>
          <p className="text-sm text-gray-600 max-w-[340px] mx-auto leading-relaxed mt-6 font-medium">
            {profile.description}
          </p>
          
          <div className="pt-8 flex items-center justify-center gap-3 opacity-20">
            <div className="h-[1px] w-12 bg-blue-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <div className="h-[1px] w-12 bg-blue-600" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-5 relative z-10">
          <motion.a 
            href={`tel:${profile.phone}`}
            {...buttonVariants}
            whileHover={{ ...buttonVariants.whileHover, border: "2px solid #3b82f6" }}
            className="w-full bg-[#1e40af] text-white py-5 rounded-[28px] flex items-center justify-center gap-4 font-bold text-xl shadow-xl shadow-blue-900/40 border-2 border-transparent transition-all duration-300"
          >
            <Phone size={22} className="shrink-0" />
            <span>اتصل بي الآن</span>
          </motion.a>

          <motion.a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            {...buttonVariants}
            whileHover={{ ...buttonVariants.whileHover, border: "2px solid #10b981" }}
            className="w-full bg-[#10B981] text-white py-5 rounded-[28px] flex items-center justify-center gap-4 font-bold text-xl shadow-xl shadow-emerald-900/20 relative border-2 border-transparent transition-all duration-300"
          >
            <MessageCircle size={24} className="shrink-0" />
            <div className="flex items-center gap-2">
              <span>تواصل عبر واتساب</span>
              <div className="w-2.5 h-2.5 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_10px_#4ADE80]" />
            </div>
          </motion.a>

          <div className="grid grid-cols-2 gap-5">
            <motion.button 
              onClick={handleDownloadVCard}
              {...buttonVariants}
              whileHover={{ ...buttonVariants.whileHover, border: "2px solid rgba(0,0,0,0.1)" }}
              className="bg-white/15 backdrop-blur-md border-2 border-transparent text-black py-6 rounded-[28px] flex flex-col items-center justify-center gap-3 font-bold text-base shadow-sm hover:bg-white/25 transition-all duration-300"
            >
              <UserPlus size={22} className="text-blue-600" />
              <span>حفظ الجهة</span>
            </motion.button>

            <motion.button 
              onClick={handleCopyLink}
              {...buttonVariants}
              whileHover={{ ...buttonVariants.whileHover, border: "2px solid rgba(0,0,0,0.1)" }}
              className="bg-white/15 backdrop-blur-md border-2 border-transparent text-black py-6 rounded-[28px] flex flex-col items-center justify-center gap-3 font-bold text-base shadow-sm hover:bg-white/25 transition-all duration-300"
            >
              {copied ? <Check size={22} className="text-emerald-600" /> : <Copy size={22} className="text-blue-600" />}
              <span>{copied ? "تم النسخ!" : "نسخ الرقم"}</span>
            </motion.button>
          </div>

          <motion.button 
            onClick={() => setShowQR(true)}
            {...buttonVariants}
            className="w-full gold-gradient text-black py-5 rounded-[28px] flex items-center justify-center gap-4 font-bold text-xl shadow-2xl border border-yellow-600/20"
          >
            <QrCode size={24} className="shrink-0 text-[#8B4513] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/90 backdrop-blur-xl w-full max-w-sm rounded-[56px] p-10 relative shadow-2xl text-center border border-white/40"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-8 left-8 p-2.5 bg-gray-100/50 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <X size={22} />
              </button>

              <div className="mt-6 mb-8">
                <h2 className="text-2xl font-display font-black text-black mb-3">رمز QR الخاص بي</h2>
                <p className="text-sm text-gray-500">امسح الرمز ضوئياً لحفظ جهة الاتصال مباشرة</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-[40px] mb-8 flex items-center justify-center border border-gray-100">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profile.website)}`} 
                  alt="QR Code" 
                  className="w-52 h-52"
                />
              </div>

              <button 
                onClick={handleDownloadVCard}
                className="w-full bg-blue-600 text-white py-4.5 rounded-[24px] font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 py-4"
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
