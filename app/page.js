import Head from 'next/head';
import RandomPicker from '../app/components/RandomPicker';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Random Winner Picker</title>
        <meta name="description" content="Random winner picker from CSV file" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>
          Sélecteur Aléatoire
        </h1>
        <RandomPicker />
      </main>
    </div>
  );
}