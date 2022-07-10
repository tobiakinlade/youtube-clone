export const getVideos = async (options, prisma) => {
  const data = {
    where: {},
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      author: true,
    },
  }

  const videos = await prisma.video.findMany(data)

  return videos
}

export const getVideo = async (id, prisma) => {
  const video = await prisma.video.findUnique({
    where: { id },
    include: {
      author: true,
    },
  })

  return video
}
