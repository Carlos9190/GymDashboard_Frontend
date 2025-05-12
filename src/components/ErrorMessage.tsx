export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-1 text-red-500 text-sm font-semibold text-left">
      {children}
    </div>
  )
}