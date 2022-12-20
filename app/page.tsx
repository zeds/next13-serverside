import styles from './page.module.css'

interface Todo {
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
	const responseForceCache = await fetch(url, { cache: 'force-cache'});

	// Dont cache
	// Equivalent to old getServerSideProps
	const responseNoStore = await fetch(url, { cache: 'no-store'});

	// Every 5 seconds cache will die
	// of course, you can set any second for this
	// This is equivalent to old getStaticProps wish revalidate option
	const responseRevalidate = await fetch(url, {
																		method: 'GET',
																		headers: {
																			Authorization: 'Bearer 34c2da7414070e3737fdade7b8fe887ecdba853e8ca3213daf08067aaf631b63c88660b2afb9eb223cb3827c614cb9696d4052c09d159b2833771cf770a48f3dbcadbfcfbfad340810a27f4646f1fa7db353b2ce70c286300e28df1227f17bcb76317d2e7ca2e7122ed4d5b2c832433949545bd1aea5c86575310e087d0e83f6',
																		},
																		next: { revalidate: 5 } });

	return responseRevalidate.json();
}

export default async function Home() {
	const todos = await getTodo();

	console.log("todo=", todos);

	todos.map((item) => {
		item.image_url = 'https://lusty.asia:1443' + item.profile.avatar[0].formats.thumbnail.url;
		console.log("item =", item);
	})


	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{todos.map((item) => {
					return (
						<div>
							<p>{item.id}</p>
							<img src={item.image_url} alt=""></img>
						</div>
					)
				})}
			</main>
		</div>
	)
}