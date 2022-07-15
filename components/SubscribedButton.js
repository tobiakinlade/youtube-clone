import { useRouter } from 'next/router'
import { useState } from 'react'

export default function SubscribedButton({ user, subscribed }) {
  const router = useRouter()
  console.log(subscribed)

  const [subcribedButtonText, setSubcribedButtonText] = useState('Subscribed')
  const [subscribedButtonColor, setSubscribedButtonColor] = useState('green')

  return (
    <>
      {subscribed ? (
        <button
          className={`bg-${subscribedButtonColor}-500 px-3 py-2 rounded-md`}
          onClick={async () => {
            await fetch('/api/unsubscribe', {
              body: JSON.stringify({
                unsubscribeTo: user.id,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })
            router.reload(window.location.pathname)
          }}
          onMouseMove={() => {
            setSubcribedButtonText('Unsubscribe')
            setSubscribedButtonColor('red')
          }}
          onMouseOut={() => {
            setSubcribedButtonText('Subscribed')
            setSubscribedButtonColor('green')
          }}
        >
          {subcribedButtonText}
        </button>
      ) : (
        <button
          onClick={async () => {
            await fetch('/api/subscribe', {
              body: JSON.stringify({
                subscribeTo: user.id,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })
            router.reload(window.location.pathname)
          }}
          className='bg-red-500 px-3 py-2 rounded-md'
        >
          Subscribe
        </button>
      )}
    </>
  )
}
