
'use server';

import type { HistoryItem } from '@/ai/types';
import { ai } from '@/ai/genkit';
import { gemini15Flash } from '@genkit-ai/googleai';
import fs from 'fs/promises';
import path from 'path';

const companyInfo = `
# About UhurU Trade Ltd.
UhurU is a young and innovative company with extensive experience in technology and finance.
Our mission is to help businesses optimize their operations, reduce costs, and strategically plan their tax structures. We specialize in helping companies based in jurisdictions like the United Kingdom, Estonia, the United States, and Cyprus to improve fiscal efficiency and operational costs. We offer a wide range of services designed to help businesses thrive in the modern digital world.
From AI automation and AI agents to full-stack no-code/low-code app development, we provide cutting-edge solutions that enhance business processes, automate tasks, and enable rapid innovation. With our no-code platforms, businesses can build powerful tools quickly without extensive coding expertise, saving time and resources.
Our team also has deep experience in Oracle Financials, offering ERP and CRM solutions that streamline financial management and customer relations. Additionally, we automate social media management, email campaigns, invoicing, and community engagement to ensure businesses run efficiently across all platforms.
At UhurU, we combine technology and finance to deliver strategic solutions tailored to your business needs. Whether you want to optimize your tax structure, automate processes, or develop custom applications, we have the expertise to help your business grow while keeping costs low and productivity high.
`;

const servicesInfo = `
# Our Services
- Amazon FBA Consulting: Full-service management for product launch, SEO, PPC marketing, and growth.
- AI Automation and AI Agents: Custom AI agents for marketing, invoicing, and support to reduce costs.
- Blockchain and Crypto Solutions: Asset tokenization and DeFi liquidity strategies.
- Offshore & Localization Strategies: Tax-optimized global business structures.
- Options and Forex Investment Training: Professional training for secure investment strategies.
- No-Code App Development: Build portable web and mobile apps with no-code solutions.
- ERP and CRM Implementation: Oracle Financials consulting for enterprise management.
- Cloud (SaaS/PaaS) Management: Cost-efficient management of SaaS/PaaS deployments.
- Flexible All-in-One Tech Package: Scalable tech solutions with PAYG pricing.
`;

async function logTrace(functionName: string, data: any) {
    if (process.env.TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] uhurulog_${functionName}: ${JSON.stringify(data, null, 2)}\n\n`;
        try {
            const logFilePath = path.join(process.cwd(), 'trace.log');
            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error('Failed to write to trace.log', error);
        }
    }
}

export async function chat(newUserMessage: string, history: HistoryItem[]): Promise<string> {
    const functionName = 'chat';
    await logTrace(functionName, { input_newUserMessage: newUserMessage, input_history: history });

    const chatHistory = history.map(item => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        content: [{ text: item.content }]
    }));

    try {
        await logTrace(functionName, { status: 'calling_ai_generate' });
        const response = await ai.generate({
            model: gemini15Flash,
            history: chatHistory,
            prompt: newUserMessage,
            system: `You are UhurU's AI assistant. Your personality is friendly, helpful, and approachable, not overly formal or robotic. Your goal is to answer user questions about the company, its services, and how to contact them.
                - You must communicate in both English and Spanish. Detect the user's language and respond in the same language.
                - Use the provided company and services information to answer questions.
                - If you don't know the answer, say that you can't help with that and suggest they contact the company directly at hello@uhurutrade.com. In Spanish, say "No puedo ayudarte con eso, pero puedes contactar directamente a la empresa en hello@uhurutrade.com".
                - Do not answer questions that are not related to UhurU Trade Ltd.
        
                HERE IS THE COMPANY INFORMATION:
                ${companyInfo}

                HERE IS THE SERVICES INFORMATION:
                ${servicesInfo}
            `,
        });

        await logTrace(functionName, { output_ai_response: response.text });
        return response.text;

    } catch (error) {
        const errorMessage = error instanceof Error ? `Sorry, there was a problem: ${error.message}` : "Sorry, I couldn't connect to the assistant at this time. Please try again later.";
        await logTrace(functionName, { output_error: errorMessage });
        return errorMessage;
    }
}
