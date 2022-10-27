import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';
import { useState } from 'react';
import styles from '../../../styles/styles.module.scss';
import Router, { useRouter } from 'next/router'
import axios from 'axios';
const json = require('./../../../package.json');

export default function QrUser() {
    const [link, setLink] = useState('');
    const [qrcodeLink, setQrcodeLink] = useState('');
    const [nameUser, setNameUser] = useState('');
    var idUser;
    
    function handleGenerateQrCode(link_url) {
        QRCodeLink.toDataURL(link_url, {
            width: 600,
            margin: 3,
        }, function (err, url) {
            setQrcodeLink(url);
        })
    }

    async function getNameUser(urlApi, id) {
        var body = await axios({
            method: 'get',
            url: `${urlApi}/api/virtualcards/${id}`,
        });
        var name = body.data.name;
        return name;
    }

    async function init() {
        var params = new URLSearchParams(window.location.search);
        idUser = await params.get('id');
        var ipaddress = await json.urlApi;
        var dataNameUser = await getNameUser(ipaddress, idUser);
        setNameUser(dataNameUser);
        var linkMob = await json.urlWeb;
        setLink(`${linkMob}/perfil?id=${idUser}`);
    }

    useEffect(
        () => {
            init();
        }
    )

    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1 className='textTitle'>{nameUser}</h1>
                </div>
                <div className='content'>
                    <div className={styles.divGlobal}>
                        <h1>Scan Me</h1>
                    </div>
                </div >
                <QRCode
                    value={link}
                />
                <button onClick={() => Router.push(`/perfil?id=${idUser}`)} className={styles.button}>Ver pagina criada :)</button>
            </div>
        </div>
    )
}
