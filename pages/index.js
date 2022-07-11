import Heading from 'components/Heading'
import Videos from 'components/Videos'
import { getVideos } from 'lib/data'
import prisma from 'lib/prisma'
import LoadMore from 'components/LoadMore'
import { useState } from 'react'
import { amount } from 'lib/config'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home({ initialVideos }) {
  const [videos, setVideos] = useState(initialVideos)
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)

  const { data: session, status } = useSession()
  const router = useRouter()

  const loading = status === 'loading'

  if (loading) {
    return null
  }

  if (session && !session.user.name) {
    router.push('/setup')
  }
  return (
    <div>
      <Heading />
      <header className='h-14 flex pt-5 px-5 pb-2'>
        <div className='text-xl'>
          <p>Youtube Clone</p>
        </div>

        <div className='grow'></div>
      </header>
      {videos.length === 0 && <p>No video found</p>}
      <Videos videos={videos} />
      {!reachedEnd && (
        <LoadMore
          videos={videos}
          setVideos={setVideos}
          setReachedEnd={setReachedEnd}
        />
      )}
    </div>
  )
}

export async function getServerSideProps() {
  let videos = await getVideos({}, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      initialVideos: videos,
    },
  }
}
