
import FullScreenChat from "@/components/uhuru/FullScreenChat";
import SubPageHeader from "@/components/uhuru/subpage-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "UhurU AI Chat | Tech & Finance Solutions",
    description: "Interact with the UhurU AI assistant. Ask questions about our services, technology, and finance solutions.",
};

export default function AiChatPage() {
    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <SubPageHeader backHref="/" backText="Back to Home" />
            <main className="flex-1 flex flex-col min-h-0">
                <FullScreenChat />
            </main>
        </div>
    )
}
