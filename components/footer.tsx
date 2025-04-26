import Link from "next/link"
import { Skull } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-purple-900/40 bg-black py-8">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Skull className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-bold text-purple-300">Valgavoth</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Enter the realm of darkness and command the power of the soul harvester
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-purple-300">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/cards" className="text-muted-foreground hover:text-purple-400">
                Cards
              </Link>
            </li>
            <li>
              <Link href="/deck-builder" className="text-muted-foreground hover:text-purple-400">
                Deck Builder
              </Link>
            </li>
            <li>
              <Link href="/lore" className="text-muted-foreground hover:text-purple-400">
                Lore
              </Link>
            </li>
            <li>
              <Link href="/community" className="text-muted-foreground hover:text-purple-400">
                Community
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-purple-300">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/rules" className="text-muted-foreground hover:text-purple-400">
                Game Rules
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-purple-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-muted-foreground hover:text-purple-400">
                Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-purple-300">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-purple-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-purple-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-muted-foreground hover:text-purple-400">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 border-t border-purple-900/40 pt-6">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Valgavoth's Domain. All rights reserved. Not affiliated with Wizards of the
          Coast.
        </p>
      </div>
    </footer>
  )
}
