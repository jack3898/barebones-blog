import { useAuthContext } from '@blog/components/context';
import { Card, Container } from '@blog/components/core';
import { useLogout } from '@blog/components/hooks';
import { useModal } from '@blog/components/modal';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
	const { loggedInUser } = useAuthContext();
	const { modalUpdate, modalToggle } = useModal();
	const [logout] = useLogout();
	const navigate = useNavigate();

	return (
		<Container className="px-4 pb-4">
			<header>
				<Card className="flex gap-4 justify-between p-4">
					<Link to="/">Blog</Link>
					<div>
						<Link
							onClick={(e) => {
								if (!loggedInUser) return;

								e.preventDefault();

								modalUpdate({
									title: 'Confirm logout',
									content: <p>Are you sure you want to log out?</p>,
									footer: (
										<div className="flex gap-4">
											<button
												className="primary"
												onClick={() => {
													modalToggle(false);
												}}
											>
												No
											</button>
											<button
												className="danger"
												onClick={() => {
													logout(() => navigate('/login'));

													modalToggle(false);
												}}
											>
												Yes
											</button>
										</div>
									)
								});

								modalToggle(true);
							}}
							to="/login"
						>
							{loggedInUser ? 'Logout' : 'Login'}
						</Link>
					</div>
				</Card>
			</header>
		</Container>
	);
}
