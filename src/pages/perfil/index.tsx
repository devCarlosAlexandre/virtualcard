import axios from 'axios';
import React, { useEffect } from 'react';
import styles from './../../../styles/styles.module.scss';
const json = require('./../../../package.json');
export default function Perfil() {
    const [name, setName] = React.useState('');
    const [linkLinkedin, setLinkLinkedin] = React.useState('');
    const [linkGithub, setLinkGithub] = React.useState('');
    const [history, setHistory] = React.useState('');
    async function getInfoUser() {
        var params = new URLSearchParams(window.location.search);
        var ipaddress = await json.urlApi;
        const idUser = params.get('id');
        var user = await axios({
            method: 'get',
            url: `${ipaddress}/api/virtualcards/${idUser}`,
        });
        console.log(user);
        setName(user.data.name);
        setLinkGithub(user.data.link_github);
        setLinkLinkedin(user.data.link_linkedin);
        setHistory(user.data.history);
    }
    useEffect(() => {
        getInfoUser();
    })
    return (
        <div className={styles.body}>
            <div className={styles.content} >
                <h4>Hello, my name is: <span className={styles.span}>{name}</span></h4>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    padding: '10px'
                }}>
                    <h1 className={styles.title}>My history</h1>
                </div>

                <p><span className={styles.span}>My history: </span>{history}</p>
                <div style={{
                    paddingTop: '30px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <a href={linkGithub} className={styles.a}>GitHub</a>
                    <a href={linkLinkedin} className={styles.a}>Linkedin</a>
                </div>
            </div>
        </div>
    )
}