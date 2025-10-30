import Image from "next/image";
import { X } from "lucide-react";

const SidebarHeader = ({ isMobile, onClose }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-3">
      {/* Logo */}
      <div className="relative w-10 h-10 md:w-12 md:h-12">
        <Image
          src="/applogo.png"
          alt="Medi-Insight Logo"
          fill
          className="object-contain rounded-full"
          priority
        />
      </div>

      {/* App Name */}
      <div className="hidden md:block text-[30px] font-semibold text-violet-700 mb-2">
        Medi-Insight
      </div>
    </div>

    {/* Close button for mobile */}
    {isMobile && (
      <button onClick={onClose} className="cursor-pointer">
        <X size={28} className="text-white" />
      </button>
    )}
  </div>
);

export default SidebarHeader;
