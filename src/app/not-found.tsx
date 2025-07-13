
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SubPageHeader from '@/components/uhuru/subpage-header';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="flex-1 flex items-center justify-center text-center">
        <div className="space-y-6">
          <h1 className="text-8xl font-bold tracking-tighter text-primary font-headline">404</h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
