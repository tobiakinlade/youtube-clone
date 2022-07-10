import Heading from 'components/Heading'
import Videos from 'components/Videos'
import { getVideos } from 'lib/data'
import prisma from 'lib/prisma'
import Head from 'next/head'

export default function Home({ videos }) {
  // console.log(videos)
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
    </div>
  )
}

export async function getServerSideProps() {
  let videos = await getVideos({}, prisma)
  videos = JSON.parse(JSON.stringify(videos))

  return {
    props: {
      videos,
    },
  }
}
