import RagUcmChat from "@/components/uhuru/RagUcmChat";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "RAG UCM | UhurU AI",
    description: "Interact with the RAG UCM AI assistant.",
};

export default function RagUcmPage() {
    return (
        <div className="h-screen w-screen bg-background text-foreground overflow-hidden">
            <RagUcmChat />
        </div>
    )
}
