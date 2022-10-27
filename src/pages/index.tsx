import React from 'react';
import styles from '../../styles/styles.module.scss';

export default function Home() {
  const [name, setName] = React.useState('');
  const [linkLinkedin, setLinkLinkedin] = React.useState('');
  const [linkGithub, setLinkGithub] = React.useState('');
  function handleGenerateQrCode(name, linkLinkedin, linkGithub) {
    fetch('http://127.0.0.1:3333/qruser', {
      method: 'POST', body: JSON.stringify({
        name: name,
        linkLinkedin: linkLinkedin,
        linkGithub: linkGithub
      })
    }).then((json) => {
      console.log(json);
    })

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
