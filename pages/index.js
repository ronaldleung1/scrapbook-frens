import Head from "next/head";
import styles from "../styles/Home.module.css";
import fetch from "isomorphic-unfetch";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Hack Clubber</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src={props.user.avatar} className={styles.avatar} />
        <h1 className={styles.title}>
          Frens of <span className={styles.accent}>@{props.user.username}</span>
        </h1>
        <h2 className={styles.description}>Visit their&nbsp;
          <a href={"https://scrapbook.hackclub.com/" + props.user.username}>Scrapbook</a>
          <span> | </span>
          <a href={"https://hackclub.slack.com/team/" + props.user.slack}>Slack</a>
          {(props.user.github || props.user.website) && (<span> | </span>)}
          {props.user.github && (
            <a href={props.user.github}>GitHub</a>
          )}
          {props.user.github && props.user.website && (<span> | </span>)}
          {props.user.website && (
            <a href={props.user.website}>Website</a>
          )}
        </h2>
        <div className={styles.grid}>
          {props.frens.map((fren) => {
            return (
              <div
                className={styles.card}
              >
                <img src={fren.avatar} className={styles.avatarsm} />
                <h3>
                  @{fren.username}
                  {/*fren.webring.map((frn) => {
                    if(frn == fren.id)
                      return;
                  })*/}
                  {fren.webring.filter(f => f == props.user.id)[0]
                    && <span className={styles.muted}> ∞</span>}
                </h3>
                <p>
                  <a href={"https://scrapbook.hackclub.com/" + fren.username}>Scrapbook</a>
                  <span> | </span>
                  <a href={"https://hackclub.slack.com/team/" + fren.slack}>Slack</a>
                  {(fren.github || fren.website) && (<span> | </span>)}
                  {fren.github && (
                    <a href={fren.github}>GitHub</a>
                  )}
                  {fren.github && fren.website && (<span> | </span>)}
                  {fren.website && (
                    <a href={fren.website}>Website</a>
                  )}
                </p>
              </div>
            )
          })}
        </div>
      </main>
      <footer className={styles.footer}>
        Scrapbook frens, built by&nbsp;<a href="http://scrapbook.hackclub.com/googol/">@Googol</a>!
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  let users = await fetch(
    "https://scrapbook.hackclub.com/api/users/"
  ).then((r) => r.json());
  let ringUsers = users.filter(u => u.webring.length != 0);
  let user = ringUsers[Math.floor(Math.random() * ringUsers.length)];
  
  let frens = user.webring.map((fren) => {
    return users.filter(u => u.id == fren)[0];
  });
  console.log(user);
  console.log(frens);
  return {
    props: { user, frens },
  };
}