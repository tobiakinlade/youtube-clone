import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Heading() {
  const router = useRouter()
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
    </header>
  )
}
