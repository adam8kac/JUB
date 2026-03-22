export default function Loader({ message = 'Nalagam...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
      </div>
      <p className="text-gray-500 text-sm font-medium">{message}</p>
    </div>
  )
}
