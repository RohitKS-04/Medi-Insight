import { Home, HeartPulse, Image, Bot, Stethoscope } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: HeartPulse, label: "Symptoms" },
  { icon: Image, label: "Image Diagnosis" },
  { icon: Bot, label: "AI Consult" },
];

const SidebarMenu = ({ activeMenu, onMenuClick, isLight }) => (
  <div className="flex flex-col gap-3 text-lg p-4 rounded-lg">
    {menuItems.map((item) => (
      <div
        key={item.label}
        onClick={() => onMenuClick(item.label)}
        className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
          activeMenu === item.label
            ? "bg-[#D1E9FF] text-[#222260] font-semibold"
            : isLight
            ? "hover:bg-[#D1E9FF] text-[#222260]"
            : "hover:bg-[#515152] text-[#BDBDBD]"
        }`}
      >
        <item.icon size={18} /> {item.label}
      </div>
    ))}
  </div>
);

export default SidebarMenu;
