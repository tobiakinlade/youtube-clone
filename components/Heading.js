import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Heading() {
  const { data: session, status } = useSession()

  const router = useRouter()

  const loading = status === 'loading'
  if (loading) {
    return null
  }
  return (
    <header className='h-14 flex pt-5 px-5 pb-2'>
      <div className='text-xl'>
        {router.asPath === '/' ? (
          <p>Youtube clone</p>
        ) : (
          <Link href={`/`}>
            <a className='underline'>Home</a>
          </Link>
        )}
      </div>

      <div className='grow ml-10 -mt-1'></div>

      {session &&
        (router.asPath === '/subscriptions' ? (
          <a className='flex'>
            <p className='mr-3 font-bold'>Subscriptions</p>
          </a>
        ) : (
          <Link href={`/subscriptions`}>
            <a className='flex'>
              <p className='mr-3 underline'>Subscriptions</p>
            </a>
          </Link>
        ))}
      {session && (
        <Link href={`/channel/${session.user.username}`}>
          <a className='flex'>
            <img
              className='h-8 w-8 mr-2 mb-2 -mt-1 rounded-full'
              src={session.user.image}
            />
            <p className='mr-3'>{session.user.username}</p>
          </a>
        </Link>
      )}

      <a
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
        className='flex-l border px-4 font-bold rounded-full'
      >
        {session ? 'logout' : 'login'}
      </a>
    </header>
  )
}
