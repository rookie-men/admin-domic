interface DefaultLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <header></header>
      <main className='flex-1'>
        <section className='container grid items-center gap-2 pt-6 pb-8 md:py-8'>
          {children}
        </section>
      </main>
    </div>
  )
}
