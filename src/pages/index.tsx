import React from 'react';
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
const json = require('./../../package.json');
import axios from 'axios';

export default function Home() {
  const [name, setName] = React.useState('');
  const [linkLinkedin, setLinkLinkedin] = React.useState('');
  const [linkGithub, setLinkGithub] = React.useState('');
  const [history, setHistory] = React.useState('');

  const saveUser = async (name: string, linkLinkedin: string, linkGithub: string) => {
    if (name !== '' || linkLinkedin !== '' || linkGithub !== '' || history !== '') {
      var ipaddress = await json.urlApi;
      var idUser: string;

      var body = await axios({
        method: 'post',
        url: `${ipaddress}/api/virtualcards`,
        data: {
          name: name,
          link_linkedin: linkLinkedin,
          link_github: linkGithub,
          history: history
        }
      });
      idUser = body.data.id;
      Router.push(`/qruser?id=${idUser}`);
    } else {
      alert('fill in all fields');
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.title}> <h2>QR Code Image Generator</h2></div>
        <div className={styles.formGroup}>
          <span>Name</span>
          <input className={styles.formField}
            type="text"
            placeholder="My name is..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <span>Linkedin URL</span>
          <input className={styles.formField}
            type="text"
            placeholder="www.likedin..."
            value={linkLinkedin}
            onChange={e => setLinkLinkedin(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <span>Github URL</span>
          <input className={styles.formField}
            type="text"
            placeholder="www.github..."
            value={linkGithub}
            onChange={e => setLinkGithub(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <span>My history</span>
          <input className={styles.formField}
            type="text"
            placeholder="My history..."
            value={history}
            onChange={e => setHistory(e.target.value)}
          />
        </div>
        <button onClick={() => saveUser(name, linkGithub, linkLinkedin)} className={styles.button}> Generate qr</button>
      </div>
    </div>
  )
}
