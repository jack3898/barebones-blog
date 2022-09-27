import { Container } from '@blog/components/core';
import { useDbUserCheck } from 'src/trpc-hooks/useDbUserCheck';
import { AdminCreator } from './components/AdminCreator';

export default function Admin() {
	const userExists = useDbUserCheck();

	return (
		<Container className="grid gap-8 px-4">
			<article>
				<h1>Admin</h1>
				{/* TODO: Remove this in favour of a more secure apperoach */}
				{userExists.data?.exists === false && (
					<>
						<h2>Create your first user!</h2>
						<p>There are no users in your database.</p>
						<p>
							As a first step to getting started, please input the credentials in the
							form below.
						</p>
						<AdminCreator />
					</>
				)}
				<br />
			</article>
		</Container>
	);
}
