import Image from 'next/image'
import Link from 'next/link'

export default function ItemCard({
  poster_path,
  title,
  url,
}: {
  poster_path: string
  title: string
  url: string
}) {
  return (
    <div className="group relative">
      <Image
        src={poster_path}
        alt={title}
        width={180}
        height={273}
        className="mb-2 rounded-lg border border-white/10 transition-all duration-300 group-hover:scale-105"
      />
      <p className="font-semibold">{title}</p>

      <Link href={url} className="after:absolute after:inset-0" />
    </div>
  )
}
