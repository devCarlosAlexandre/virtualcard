import React, { useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';
import { useState } from 'react';
import styles from '../../../styles/styles.module.scss';
import Router, { useRouter } from 'next/router';
import * as htmlToImage from 'html-to-image';
import axios from 'axios';
const json = require('./../../../package.json');

export default function QrUser() {
    var idUser: string;
    const [nameUser, setNameUser] = useState('');
    const [linkDownload, setLinkDownload] = useState('');
    const myref = useRef(null)
    function handleGenerate(link_url: string) {
        QRCodeLink.toDataURL(link_url, {
            width: 300,
            margin: 2,
        }, function (_e: any, url: React.SetStateAction<string>,) {
            setLinkDownload(url)
        })
    }

    const downloadImg = async () => {
        const dataUrl = await htmlToImage.toPng(myref.current);
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
    }


    async function getNameUser(urlApi: string, id: string) {
        var body = await axios({
            method: 'get',
            url: `${urlApi}/api/virtualcards/${id}`,
        });
        var name = body.data.name;
        return name;
    }

    const init = async () => {
        const params = new URLSearchParams(window.location.search);
        idUser = params.get('id');
        const ipaddress = await json.urlApi;
        const dataNameUser = await getNameUser(ipaddress, idUser);
        setNameUser(dataNameUser);
        const linkMob = await json.urlWeb;
        handleGenerate(`${linkMob}/perfil?id=${idUser}`);
    }

    useEffect(
        () => {
            init();
        }
    )

    return (
        <div className={styles.body}>
            <div className={styles.content} >
                <div className={styles.divGlobal}>
                    <h1>Scan Me</h1>
                </div>
                <div id="domEl" ref={myref}>
                    <div className={styles.h1}>
                        <h1 className='textTitle' style={{ color: '#000', padding: '20px', textAlign: 'center' }}>{nameUser}</h1>
                    </div>
                    <div className='content'>
                    </div >
                    <img src={linkDownload} alt="qrcode" />
                </div>
                <div className={styles.divGlobal}>
                    <button onClick={() => Router.push(`/perfil?id=${idUser}`)} className={styles.button}>See virtual card :)</button>
                </div>
                <div className={styles.divGlobal}>
                    <button onClick={downloadImg} className={styles.button}>Download da imagem com nome</button>
                </div>
            </div>
        </div>
    )
}
