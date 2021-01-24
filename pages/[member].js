import Head from "next/head";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import fetch from "isomorphic-unfetch";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>@{props.user.profile.username} | Scrapbook Frens</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src={props.user.profile.avatar} className={styles.avatar} />
        <h1 className={styles.title}>
          Frens of <span className={styles.accent}>@{props.user.profile.username}</span>
        </h1>
        <h2 className={styles.description}>Visit their&nbsp;
          <a href={"https://scrapbook.hackclub.com/" + props.user.profile.username}>Scrapbook</a>
          <span> | </span>
          <a href={"https://hackclub.slack.com/team/" + props.user.profile.slack}>Slack</a>
          {(props.user.profile.github || props.user.profile.website) && (<span> | </span>)}
          {props.user.profile.github && (
            <a href={props.user.profile.github}>GitHub</a>
          )}
          {props.user.profile.github && props.user.profile.website && (<span> | </span>)}
          {props.user.profile.website && (
            <a href={props.user.profile.website}>Website</a>
          )}
        </h2>
        <div className={styles.grid}>
          {props.user.webring.map((fren) => {
            return (
              <div
                className={styles.card}
              >
                <img src={fren.avatar} className={styles.avatarsm} />
                <h3>
                  <Link href={"/"+fren.username}>{'@'+fren.username}</Link>
                  {fren.webring.filter(f => f == props.user.profile.id)[0]
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
        {props.user.webring.length === 0 && 
          <>
            <p className={styles.muted} style={{marginBottom: 0}}>Looks like they haven't added any frens to their Scrapbook yet :(</p>
            <p className={styles.link}><Link href="/">Find other Hack Clubbers</Link></p>
          </>
        }
      </main>
      <footer className={styles.footer}>
        Scrapbook frens, built by&nbsp;<a href="http://scrapbook.hackclub.com/googol/">@Googol</a>!
      </footer>
    </div>
  );
}

export async function getServerSidePaths() {
  const paths = ['googol'];
  return {
    paths,
    fallback: false
  }
}

export async function getServerSideProps({ params, res }) {
  let user = await fetch(
    "https://scrapbook.hackclub.com/api/users/"+params.member
  ).then((r) => r.json());
  console.log(user);
  return {
    props: { user },
  };
}