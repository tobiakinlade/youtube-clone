import prisma from 'lib/prisma'

import { getVideo, getVideos } from 'lib/data'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function SingleVideo({ video, videos }) {
  if (!videos) return <p className='text-center p-5'>Video does not exist</p>
  return (
    <>
      <ReactPlayer
        className='react-player absolute top-0 left-0'
        url={video.url}
        width='100%'
        height='100%'
        controls={true}
        light={video.thumbnail}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  let video = await getVideo(context.params.id, prisma)
  video = JSON.parse(JSON.stringify(video))

  let videos = await getVideos({ take: 3 }, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      video,
      videos,
    },
  }
}
