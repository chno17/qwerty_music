import './App.css'
import React, { useState, useEffect } from 'react'

function App() {
  const [songs, setSongs] = useState([])
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    fetch('https://api.kimrasng.kr/api/music-server/songs?artist_name=TUYU')
      .then(res => res.json())
      .then(data => {
        setSongs(data.songs)
        setCurrent(data.songs[0])
      })
      .catch(console.error)
  }, [])
  const currentIndex = songs.findIndex(s => s.id === current?.id)
  const handleNext = () => {
    if (!songs.length) return
    const nextIndex = (currentIndex + 1) % songs.length
    setCurrent(songs[nextIndex])
  }
  const handlePrev = () => {
    if (!songs.length) return
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    setCurrent(songs[prevIndex])
  }

  return (
    <div className="App" 
    style={{
    backgroundImage: `url(https://storage.kimrasng.kr/music_server/img/${current?.image_filename})`,
    }}>
      {current && (
        <div className="current">
          <img src={`https://storage.kimrasng.kr/music_server/img/${current.image_filename}`} alt="" />
          <h3>{current.title}</h3>
          <h4>{current.artist_name}</h4>
          <div>
            <button className="prev" onClick={handlePrev}>◀</button>
            <button className="next" onClick={handleNext}>▶</button>
          </div>
          <audio controls src={`https://storage.kimrasng.kr/music_server/songs/${current.filename}`} />
        </div>
      )}
      <div className="list">
        {songs.map(s => (
          <div key={s.id} onClick={() => setCurrent(s)}>
            <img src={`https://storage.kimrasng.kr/music_server/img/${s.image_filename}`} alt="" />
            <p>{s.title} - {s.artist_name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App