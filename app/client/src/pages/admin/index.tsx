import { Column } from '@blog/components/layout';
import { Header } from 'src/components';
import { useDbUserCheck } from 'src/trpc-hooks/useDbUserCheck';
import { AdminCreator } from './components/AdminCreator';

export default function Admin() {
	const userExists = useDbUserCheck();

	return (
		<Column
			header={<Header pageTitle="Administration" />}
			main={
				<article>
					{/* TODO: Remove this in favour of a more secure apperoach */}
					{(userExists.data?.exists === false && (
						<>
							<h2>Create your first user!</h2>
							<p>There are no users in your database.</p>
							<p>
								As a first step to getting started, please input the credentials in
								the form below.
							</p>
							<AdminCreator />
						</>
					)) || <p className="text-center">Nothing to show here!</p>}
				</article>
			}
			footer={null}
		/>
	);
}
