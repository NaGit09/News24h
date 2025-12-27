import type { NavItem } from "@/types/common";
import { ActivityIcon } from "@/components/ui/activity";
import { HandCoinsIcon } from "@/components/ui/hand-coins";
import { StethoscopeIcon } from "@/components/ui/stethoscope";
import { FileTextIcon } from "@/components/ui/file-text";
import { HomeIcon } from "@/components/ui/home";
import { SmileIcon } from "@/components/ui/smile";
import { CpuIcon } from "@/components/ui/cpu";
import { CompassIcon } from "@/components/ui/compass";

export const navItems: NavItem[] = [
    { label: "Trang chủ", href: "/trangchu24h", color: 'red', icon: HomeIcon },
    { label: "Tin tức", href: "/tintuctrongngay", color: 'blue', icon: FileTextIcon },
    { label: "Bóng đá", href: "/bongda", color: 'purple', icon: ActivityIcon },
    { label: "Kinh doanh", href: "/kinhdoanh", color: 'yellow', icon: HandCoinsIcon },
    { label: "Giải trí", href: "/giaitri", color: 'blue', icon: SmileIcon },
    { label: "Sức khỏe", href: "/suckhoedoisong", color: 'yellow', icon: StethoscopeIcon },
    { label: "Hi tech", href: "/congnghethongtin", color: 'orange', icon: CpuIcon },
    { label: "Ô tô", href: "/oto", color: 'blue', icon: CompassIcon },
];