import {Outlet, ScrollRestoration} from "react-router";
import {Header} from "@/components/layout/header.tsx";
import {Footer} from "@/components/layout/footer.tsx";
import {ReadingProgress} from "@/components/common/reading-process.tsx";
import {ScrollToTop} from "@/components/common/scroll-to-top.tsx";
import {KeyboardShortcutsHelp} from "@/components/common/keyboard-shortcuts-help";
import {useScrollToTop} from "@/hooks/use-scroll-to-top";
import {useKeyboardShortcuts} from "@/hooks/use-keyboard-shortcuts";

export const RootLayout = () => {
    useScrollToTop();
    useKeyboardShortcuts();
    
    return (
        <div className="font-sans antialiased">
            <ReadingProgress/>
            <Header/>
            <main className="min-h-screen">
                <Outlet/>
            </main>
            <Footer/>
            <ScrollToTop/>
            <KeyboardShortcutsHelp/>
            <ScrollRestoration/>
        </div>
    );
};