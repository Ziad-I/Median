import Link from 'next/link'

export const Agreements = () => {
  return (
    <div className="text-sm text-muted-foreground text-center mt-2">
      By signing up, you agree to our{" "}
      <Link href="/terms" className="underline hover:text-primary">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline hover:text-primary">
        Privacy Policy
      </Link>
      .
    </div>
  )
}
