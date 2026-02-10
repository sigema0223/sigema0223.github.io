import React, { useState, useEffect } from 'react';
import './WorldClock.css';

const WorldClock = () => {
  const getTimeForZone = (timeZone) => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        month: 'short',
        day: 'numeric'
      });
      
      const parts = formatter.formatToParts(now);
      const hourPart = parts.find(p => p.type === 'hour');
      const minutePart = parts.find(p => p.type === 'minute');
      const secondPart = parts.find(p => p.type === 'second');
      const monthPart = parts.find(p => p.type === 'month');
      const dayPart = parts.find(p => p.type === 'day');
      
      if (!hourPart || !minutePart || !secondPart || !monthPart || !dayPart) {
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
          time: `${hours}:${minutes}:${seconds}`,
          date: `${months[now.getUTCMonth()]} ${now.getUTCDate()}`
        };
      }
      
      const time = `${hourPart.value}:${minutePart.value}:${secondPart.value}`;
      const date = `${monthPart.value} ${dayPart.value}`;
      
      return { time, date };
    } catch (error) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
        time: `${hours}:${minutes}:${seconds}`,
        date: `${months[now.getMonth()]} ${now.getDate()}`
      };
    }
  };

  const [times, setTimes] = useState({
    seoul: { time: '00:00:00', date: 'Jan 1' },
    london: { time: '00:00:00', date: 'Jan 1' },
    newyork: { time: '00:00:00', date: 'Jan 1' }
  });

  const updateTimes = () => {
    setTimes({
      seoul: getTimeForZone('Asia/Seoul'),
      london: getTimeForZone('Europe/London'),
      newyork: getTimeForZone('America/New_York')
    });
  };

  useEffect(() => {
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const ClockCard = ({ city, time, date }) => {
    if (!time || time === '') {
      return null;
    }
    
    const [hours, minutes, seconds] = time.split(':');
    const hourAngle = (parseInt(hours) % 12) * 30 + parseInt(minutes) * 0.5;
    const minuteAngle = parseInt(minutes) * 6;
    const secondAngle = parseInt(seconds) * 6;

    return (
      <div className="clock-card">
        <div className="clock-minimal">
          {/* 미니멀한 시계 다이얼 */}
          <div className="clock-ring">
            {/* 시간 마커 */}
            {[12, 3, 6, 9].map((h, idx) => {
              const angle = (h * 30 - 90) * (Math.PI / 180);
              const markerRadius = 75;
              const markerX = 50 + markerRadius * Math.cos(angle);
              const markerY = 50 + markerRadius * Math.sin(angle);
              return (
                <div
                  key={idx}
                  className="clock-marker"
                  style={{
                    left: `${markerX}%`,
                    top: `${markerY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              );
            })}
            
            {/* 모든 시간 숫자 (미니멀 스타일) */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
              const angle = (h * 30 - 90) * (Math.PI / 180);
              const numberRadius = 80;
              const numberX = 50 + numberRadius * Math.cos(angle);
              const numberY = 50 + numberRadius * Math.sin(angle);
              const isMajor = [12, 3, 6, 9].includes(h);
              return (
                <div
                  key={h}
                  className={`clock-number ${isMajor ? 'clock-number-major' : 'clock-number-minor'}`}
                  style={{
                    left: `${numberX}%`,
                    top: `${numberY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {h}
                </div>
              );
            })}
            
            {/* 시침 */}
            <div 
              className="clock-hand hour-hand-minimal" 
              style={{ transform: `rotate(${hourAngle}deg)` }}
            />
            
            {/* 분침 */}
            <div 
              className="clock-hand minute-hand-minimal" 
              style={{ transform: `rotate(${minuteAngle}deg)` }}
            />
            
            {/* 초침 */}
            <div 
              className="clock-hand second-hand-minimal" 
              style={{ transform: `rotate(${secondAngle}deg)` }}
            />
            
            {/* 중심점 */}
            <div className="clock-center-minimal" />
          </div>
        </div>
        
        <div className="clock-info-minimal">
          <div className="clock-city-minimal">{city}</div>
          <div className="clock-time-minimal">{time}</div>
          <div className="clock-date-minimal">{date}</div>
        </div>
      </div>
    );
  };

  return (
    <section className="world-clock-section" id="when-section">
      <div className="world-clock-container">
        {times.seoul.time && times.seoul.time !== '00:00:00' ? (
          <>
            <ClockCard 
              city="Seoul" 
              time={times.seoul.time} 
              date={times.seoul.date}
            />
            <ClockCard 
              city="London" 
              time={times.london.time} 
              date={times.london.date}
            />
            <ClockCard 
              city="New York" 
              time={times.newyork.time} 
              date={times.newyork.date}
            />
          </>
        ) : (
          <div className="clock-loading">Loading clocks...</div>
        )}
      </div>
    </section>
  );
};

export default WorldClock;
