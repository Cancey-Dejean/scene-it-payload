export default function AddContent({ title }: { title: string }) {
  return (
    <div className="h-full py-40 flex items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-600">{title}</h1>
    </div>
  )
}
