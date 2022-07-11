import { upload } from 'lib/upload'
import middleware from 'middleware/middleware'
import { getSession } from 'next-auth/react'
import nextConnect from 'next-connect'
import prisma from 'lib/prisma'

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
  const session = await getSession({ req })
  if (!session)
    return res.status(401).json({ message: 'You are not logged in' })

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) return res.status(401).json({ message: 'User not found' })

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: req.body.name[0],
      username: req.body.username[0],
    },
  })

  if (req.files && req.files.image[0]) {
    const avatar_url = await upload({
      file: req.files.image[0],
      user_id: user.id,
    })

    await prisma.user.update({
      where: { id: user.id },
      data: {
        image: avatar_url,
      },
    })
  }

  res.end()
  return
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
