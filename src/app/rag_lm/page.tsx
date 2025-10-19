import RagLmChat from "@/components/uhuru/RagLmChat";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "RAG LM | UhurU AI",
    description: "Interact with the RAG LM AI assistant.",
};

export default function RagLmPage() {
    return (
        <div className="h-screen w-screen bg-background text-foreground overflow-hidden">
            <RagLmChat />
        </div>
    )
}
