import axios from 'axios';
import React, { useEffect } from 'react';
import styles from './../../../styles/styles.module.scss';
const json = require('./../../../package.json');
export default function Perfil() {

    const [user, setUser] = React.useState({
        history: '',
        link_github: '',
        link_linkedin: '',
        name: '',
    });

    const getInfoUser = async () => {
        var params = new URLSearchParams(window.location.search);
        var ipaddress = await json.urlApi;
        var idUser = params.get('id');
        var body = await axios({
            method: 'get',
            url: `${ipaddress}/api/virtualcards/${idUser}`,
        });
        setUser(body.data);
    }

    useEffect(() => {
        getInfoUser();
    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.content} >
                <h4>Hello, my name is: <span className={styles.span}>{user.name}</span></h4>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    padding: '10px'
                }}>
                    <h1 className={styles.title}>My history</h1>
                </div>
                <p><span className={styles.span}>My history: </span>{user.history}</p>
                <div style={{
                    paddingTop: '30px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <a href={user.link_github} className={styles.a}>GitHub</a>
                    <a href={user.link_linkedin} className={styles.a}>Linkedin</a>
                </div>
            </div>
        </div>
    )
}