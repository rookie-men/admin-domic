import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from '~/components/ui/sonner'
import GeneralError from '~/features/errors/general-error'
import NotFoundError from '~/features/errors/not-found-error'
import DefaultLayout from '~/layouts/default'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
        <Toaster />
        {/* {import.meta.env.MODE === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )} */}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
