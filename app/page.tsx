import styles from './page.module.css'

interface Todo {
	map: any;
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

async function getTodo(): Promise<Todo> {
	//const url = "https://jsonplaceholder.typicode.com/todos/1";
	const url = "https://lusty.asia:1443/api/users?populate=profile.avatar,tags.category&sort=updatedAt:desc";

	// Default method of cache:
	// Like old getStaticProps
	//const responseForceCache = await fetch(url, { cache: 'force-cache'});

	// Dont cache
	// Equivalent to old getServerSideProps
	//const responseNoStore = await fetch(url, { cache: 'no-store'});

	// Every 5 seconds cache will die
	// of course, you can set any second for this
	// This is equivalent to old getStaticProps wish revalidate option
	const responseRevalidate = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer 34c2da7414070e3737fdade7b8fe887ecdba853e8ca3213daf08067aaf631b63c88660b2afb9eb223cb3827c614cb9696d4052c09d159b2833771cf770a48f3dbcadbfcfbfad340810a27f4646f1fa7db353b2ce70c286300e28df1227f17bcb76317d2e7ca2e7122ed4d5b2c832433949545bd1aea5c86575310e087d0e83f6',
		},
		next: { revalidate: 5 } }
	);
	return responseRevalidate.json();
}

export default async function Home() {
	const todos = await getTodo();

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{todos.map((item: any) => {
					return (
						<div>
							<p>{item.id}</p>
							<p>{item.username}</p>
							{item.profile.avatar.map((url: any) => {
							return (
								<img src={`http://lusty.asia:1443${url.formats.thumbnail.url}`} alt=""></img>
							)
							})}
						</div>
					)
				})}
			</main>
		</div>
	)
}