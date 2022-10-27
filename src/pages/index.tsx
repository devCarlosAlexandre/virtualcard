import React from 'react';
import styles from '../../styles/styles.module.scss';
import Link from 'next/link';
import Router, { useRouter } from 'next/router'

export default function Home() {
  const [name, setName] = React.useState('');
  const [linkLinkedin, setLinkLinkedin] = React.useState('');
  const [linkGithub, setLinkGithub] = React.useState('');
  function handleGenerateQrCode(name: string, linkLinkedin: string, linkGithub: string) {
    if (name !== '' || linkLinkedin !== '' || linkGithub !== '') {
      const infoUser = {
        name: name,
        link_linkedin: linkLinkedin,
        link_github: linkGithub
      };
      const qrcodeJson = JSON.stringify(infoUser);
      fetch('http://127.0.0.1:8000/api/virtualcards', {
        method: 'POST', body: qrcodeJson, headers: { "Content-Type": "application/json" }
      }).then((json) => {
        var body =  json;
        console.log(body);
       // return Router.push('/qruser?name=' + body);
      })
    } else {
      console.log('Preencha todos os campos');
      alert('Preencha todos os campos');
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
        <button onClick={() => handleGenerateQrCode(name, linkGithub, linkLinkedin)} className={styles.button}> Generate qr</button>
      </div>
    </div>
  )
}
