import React from 'react';
import { header } from '../../profile'

const Header = () => {

    const showDarkModeWarning = () => {
        // 팝업이 이미 있으면 제거
        const existingPopup = document.getElementById('dark-mode-warning-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        // 팝업 생성
        const popup = document.createElement('div');
        popup.id = 'dark-mode-warning-popup';
        popup.className = 'dark-mode-warning-popup';
        popup.innerHTML = `
            <div class="dark-mode-warning-content">
                <p>Warning! Dark mode is not yet completed. Use with precaution. Thanks.</p>
                <button class="dark-mode-warning-close">OK</button>
            </div>
        `;
        document.body.appendChild(popup);

        // 닫기 버튼 이벤트
        const closeBtn = popup.querySelector('.dark-mode-warning-close');
        closeBtn.addEventListener('click', () => {
            popup.remove();
        });

        // 5초 후 자동 닫기
        setTimeout(() => {
            if (popup.parentNode) {
                popup.remove();
            }
        }, 5000);
    };

    const toggleDarkMode = (e) =>  {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        
        document.documentElement.classList.toggle('dark-mode')
        document.getElementById('not-dark')?.classList.toggle('inverse-dark')
        
        
        var x = document.getElementsByClassName('img-pro')
        for(let i = 0; i < x.length; i += 1) {
            x.item(i).classList.toggle("inverse-dark");
        }
        
        // AboutMe 이미지 필터 제거
        const aboutMeImage = document.getElementById('about-me-image');
        const aboutMeImageWrapper = document.getElementById('about-me-image-not-dark');
        const aboutMeRight = document.querySelector('.about-me-right');
        if (aboutMeImage) {
            aboutMeImage.style.setProperty('filter', 'none', 'important');
            aboutMeImage.style.setProperty('-webkit-filter', 'none', 'important');
            aboutMeImage.style.setProperty('-moz-filter', 'none', 'important');
        }
        if (aboutMeImageWrapper) {
            aboutMeImageWrapper.style.setProperty('filter', 'none', 'important');
            aboutMeImageWrapper.style.setProperty('-webkit-filter', 'none', 'important');
            aboutMeImageWrapper.style.setProperty('-moz-filter', 'none', 'important');
        }
        if (aboutMeRight) {
            aboutMeRight.style.setProperty('filter', 'none', 'important');
            aboutMeRight.style.setProperty('-webkit-filter', 'none', 'important');
            aboutMeRight.style.setProperty('-moz-filter', 'none', 'important');
        }
        
        // 다크모드로 전환된 경우 배경색 확인
        if (!isDarkMode) {
            // 다크모드로 전환됨
            setTimeout(() => {
                const bodyBg = window.getComputedStyle(document.body).backgroundColor;
                const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
                
                // RGB를 hex로 변환하는 함수
                const rgbToHex = (rgb) => {
                    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return '';
                    const result = rgb.match(/\d+/g);
                    if (!result || result.length < 3) return '';
                    return '#' + result.slice(0, 3).map(x => {
                        const hex = parseInt(x).toString(16);
                        return hex.length === 1 ? '0' + hex : hex;
                    }).join('');
                };
                
                const bodyHex = rgbToHex(bodyBg).toLowerCase();
                const htmlHex = rgbToHex(htmlBg).toLowerCase();
                const expectedColor = '#c2ae96';
                
                // 배경색이 #c2ae96가 아니면 경고 표시
                if (bodyHex && bodyHex !== expectedColor && htmlHex && htmlHex !== expectedColor) {
                    showDarkModeWarning();
                } else if (htmlHex && htmlHex !== expectedColor) {
                    showDarkModeWarning();
                } else if (bodyHex && bodyHex !== expectedColor) {
                    showDarkModeWarning();
                }
            }, 150);
        }
        
        if (document.documentElement.classList.contains('dark-mode'))
          localStorage.setItem('mode', 'Dark')
        else
          localStorage.setItem('mode', 'Light')
    }

    return (
        <div>
            <div className="Header">
                <h1>{ header.name }</h1>
                <p className="line-1 anim-typewriter">and this is my portfolio... </p>
                <label className="switch">
                    <input id="mode-switch" onClick={e => toggleDarkMode(e)} type="checkbox"/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
    
}

export default Header;