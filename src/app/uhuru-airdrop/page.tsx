
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { Loader, Send, Twitter, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { submitAirdrop } from '@/ai/actions/airdrop-action';

const airdropFormSchema = z.object({
  walletAddress: z.string().min(1, { message: 'Polygon wallet address is required.' }),
  twitterHandle: z.string().min(1, { message: 'Twitter handle is required.' }).startsWith('@', { message: 'Twitter handle must start with @' }),
  telegramUsername: z.string().min(1, { message: 'Telegram username is required.' }).startsWith('@', { message: 'Telegram username must start with @' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  howHeard: z.string().optional(),
  hasCompletedSteps: z.boolean().refine(val => val === true, {
    message: 'You must accept the legal terms to proceed.',
  }),
});

type AirdropFormValues = z.infer<typeof airdropFormSchema>;

const AirdropResult = ({ status, message }: { status: 'success' | 'error', message: string }) => (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 min-h-[500px]">
        {status === 'success' ? (
            <CheckCircle className="h-16 w-16 text-green-500" />
        ) : (
            <AlertTriangle className="h-16 w-16 text-destructive" />
        )}
        <h2 className="text-2xl font-bold font-headline">{status === 'success' ? 'Submission Successful!' : 'An Error Occurred'}</h2>
        <p className="text-muted-foreground max-w-sm">{message}</p>
        {(status === 'success' || status === 'error') && (
            <Button asChild className="mt-4">
                <Link href="/">Back to Home</Link>
            </Button>
        )}
    </div>
);


export default function UhuruAirdropPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submissionMessage, setSubmissionMessage] = useState('');

    const form = useForm<AirdropFormValues>({
        resolver: zodResolver(airdropFormSchema),
        defaultValues: {
            walletAddress: '',
            twitterHandle: '',
            telegramUsername: '',
            email: '',
            howHeard: '',
            hasCompletedSteps: false,
        },
    });

    const onSubmit = async (data: AirdropFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await submitAirdrop(data);
            if (result.success) {
                setSubmissionStatus('success');
                setSubmissionMessage('Thank you for participating! Your entry has been recorded. Rewards will be distributed after verification.');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            setSubmissionStatus('error');
            setSubmissionMessage(error instanceof Error ? error.message : 'An unknown error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <SubPageHeader backHref="/" backText="Back to Home" />
            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto max-w-2xl px-4 md:px-10">
                    <Card className="bg-card shadow-lg">
                        {submissionStatus !== 'idle' ? (
                            <AirdropResult status={submissionStatus} message={submissionMessage} />
                        ) : (
                            <>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                                        UHURU Coin Airdrop
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground pt-2">
                                        Complete the steps below to receive free 100 UHURU tokens on the Polygon Network for supporting our project.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="bg-muted/50 p-4 rounded-lg border space-y-3">
                                        <h3 className="font-semibold text-foreground">Requirements</h3>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <Twitter className="h-4 w-4" />
                                                <span>Follow us on X/Twitter: <a href="https://x.com/UhurUtradeUk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@UhurUtradeUk</a></span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Send className="h-4 w-4" />
                                                <span>Join our Telegram: <a href="https://t.me/uhurutradeuk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">UhurU Community</a></span>
                                            </li>
                                        </ul>
                                        <p className="text-sm text-muted-foreground pt-2">
                                          ⚠️ Only valid Polygon wallets (e.g., MetaMask, Trust Wallet) will be accepted. Rewards will be distributed after verification.
                                        </p>
                                    </div>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField control={form.control} name="walletAddress" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>What is your Polygon wallet address? *</FormLabel>
                                                    <FormControl><Input placeholder="0x..." {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="twitterHandle" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Your Twitter handle *</FormLabel>
                                                    <FormControl><Input placeholder="@username" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="telegramUsername" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Your Telegram username *</FormLabel>
                                                    <FormControl><Input placeholder="@user" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Your email address *</FormLabel>
                                                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                             <FormField control={form.control} name="howHeard" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>How did you hear about UHURU Coin?</FormLabel>
                                                    <FormControl><Input placeholder="e.g., Twitter, a friend, etc." {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <div className="space-y-2">
                                              <FormField control={form.control} name="hasCompletedSteps" render={({ field }) => (
                                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                                                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                                      <div className="space-y-1 leading-none">
                                                          <Label htmlFor="hasCompletedSteps" className="align-middle">
                                                            I have read and agree to the{' '}
                                                            <Link href="/airdrop-legal-terms" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                                                                Legal Terms for Token Airdrop
                                                            </Link>
                                                            .*
                                                          </Label>
                                                          <FormMessage />
                                                      </div>
                                                  </FormItem>
                                              )} />
                                              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                                  <Info className="h-4 w-4 mt-0.5 text-primary flex-shrink-0"/>
                                                  <div className="space-y-1 leading-none">
                                                      <Label className="align-middle text-muted-foreground">
                                                        We recommend reading the{' '}
                                                        <Link href="/uhurucoin-whitepaper" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                                                            UhuruCoin WhitePaper
                                                        </Link>
                                                        {' '}to fully understand the project.
                                                      </Label>
                                                  </div>
                                              </div>
                                            </div>
                                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                                {isSubmitting ? <Loader className="animate-spin" /> : "Get Free 100 Uhuru Tokens"}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </>
                        )}
                    </Card>
                    <div className="text-xs text-muted-foreground mt-4 space-y-2">
                        <div className="flex justify-center items-center gap-4">
                            <Link href="/airdrop-legal-terms" className="underline hover:text-primary">Legal Terms for Token Airdrop</Link>
                            <Link href="/uhurucoin-whitepaper" className="underline hover:text-primary">UhuruCoin WhitePaper</Link>
                        </div>
                        <p className="text-center">
                            Uhuru Trade Ltd. is the owner of this form. See our <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link> and <Link href="/cookie-policy" className="underline hover:text-primary">Cookie Policy</Link>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
