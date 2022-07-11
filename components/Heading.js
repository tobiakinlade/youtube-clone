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

      <a
        href={session ? '/api/auth/signout' : '/api/auth/signin'}
        className='flex-l border px-4 font-bold rounded-full'
      >
        {session ? 'logout' : 'login'}
      </a>
    </header>
  )
}
