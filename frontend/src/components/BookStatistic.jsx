import React, { useEffect, useState } from 'react';

function BookStatistic() {
  const [stats, setStats] = useState({
    read: 0,
    currentlyReading: 0,
    wishlist: 0
  });

  useEffect(() => {
    fetch('http://localhost:8080/book/statistics')
      .then(res => {
        if (!res.ok) {
          throw new Error('Fehler beim Laden der Statistik');
        }
        return res.json();
      })
      .then(data => setStats(data))
      .catch(() => alert('Statistik konnte nicht geladen werden.'));
  }, []);
  return (
   <div className="app">
    <h2>Meine Buchstatistik</h2>
    <div className="statistics">
      <div className="stat-item">
        <h3>Gelesen</h3>
        <p>{stats.read}</p>
      </div>
      <div className="stat-item">
        <h3>Lese gerade</h3>
        <p>{stats.currentlyReading}</p>
      </div>
      <div className="stat-item">
        <h3>Wunschliste</h3>
        <p>{stats.wishlist}</p>
      </div>
    </div>
  </div>
);
}
export default BookStatistic;
