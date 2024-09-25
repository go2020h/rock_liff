import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ liff, liffError }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (liff && liff.isLoggedIn()) {
      liff
        .getProfile()
        .then((profileData) => {
          setProfile(profileData)
          console.log('Profile:', profileData)
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }, [liff])

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>mypage</h1>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        {profile && (
          <div>
            <h2>User Profile</h2>
            <p>Name: {profile.displayName}</p>
            <p>User ID: {profile.userId}</p>
            {profile.pictureUrl && (
              <img src={profile.pictureUrl} alt="Profile" style={{ width: '100px', height: '100px' }} />
            )}
          </div>
        )}
        <a href="https://developers.line.biz/ja/docs/liff/" target="_blank" rel="noreferrer">
          LIFF Documentation
        </a>
      </main>
    </div>
  )
}
