import React from "react";
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <footer>
            <div className='footer-wrapper'>
                <a href="https://vk.com" className='footer-link vk' target="_blank" rel="noopener noreferrer"></a>
                <a href="https://youtube.com" className='footer-link yt' target="_blank" rel="noopener noreferrer"></a>
                <a href="https://ok.ru" className='footer-link ok' target="_blank" rel="noopener noreferrer"></a>
                <a href="https://t.me/danon_47" className='footer-link tg' target="_blank" rel="noopener noreferrer"></a>
            </div>
        </footer>
    )
}

export default Footer;