import PreconDeckList from "@/components/precon-deck-list"

export default function PreconDeckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <PreconDeckList />
      </div>
    </div>
  )
}
