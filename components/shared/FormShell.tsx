export default function FormShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex justify-center sm:mt-20 mt-24">
      <div className="w-full max-w-2xl rounded-[24px] bg-white p-7 sm:p-10 flex justify-center shadow-lg">
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  )
}