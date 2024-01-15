export default function FormShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-2xl rounded-[48px] bg-white p-10 flex justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  )
}