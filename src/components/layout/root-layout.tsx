import {Outlet, ScrollRestoration} from "react-router";
import {Header} from "@/components/layout/header.tsx";
import {Footer} from "@/components/layout/footer.tsx";
import {ReadingProgress} from "@/components/common/ReadingProcess";
import {ScrollToTop} from "@/components/common/ScrollToTop";
import {useScrollToTop} from "@/hooks/use-scroll-to-top";

export const RootLayout = () => {
    useScrollToTop();
    
    return (
        <div className="font-sans antialiased">
            <ReadingProgress/>
            <Header/>
            <main className="min-h-screen">
                <Outlet/>
            </main>
            <Footer/>
            <ScrollToTop/>
            <ScrollRestoration/>
        </div>
    );
};