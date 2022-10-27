import React from 'react';
import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';
import { useState } from 'react';
import styles from '../../../styles/styles.module.scss';
export default function QrUser() {
    const [link, setLink] = useState('');
    const [qrcodeLink, setQrcodeLink] = useState('');
    function handeGenerate(link_url) {
        QRCodeLink.toDataURL(link_url, {
            width: 600,
            margin: 3,
        }, function (err, url) {
            setQrcodeLink(url);
        })
    }

    function handleQrcode(e) {
        setLink(e.target.value);
        handeGenerate(e.target.value);
    }
    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1 className='textTitle'>Jhon</h1>
                </div>
                <div className='content'>
                    <h1>Scan Me</h1>
                </div >
                <QRCode
                    value={link}
                />
                {/* <input
                    className='input'
                    placeholder='Digite seu link...'
                    value={link}
                    onChange={e => handleQrcode(e)}
                /> 
                <a href={qrcodeLink} download={'qrcode.png'}>Baixar Qrcode</a>
                */}
            </div>
        </div>
    )
}