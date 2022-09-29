import { useAuthContext } from '@blog/components/context';
import { Button, Card } from '@blog/components/core';
import { useLogout } from '@blog/components/hooks';
import { useModal } from '@blog/components/modal';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

type HeaderProps = {
	pageTitle: string;
};

export function Header({ pageTitle }: HeaderProps) {
	const { loggedInUser } = useAuthContext();
	const { modalUpdate, modalToggle } = useModal();
	const [logout] = useLogout();
	const navigate = useNavigate();

	return (
		<>
			<Card>
				<nav>
					<ul className="flex gap-4 justify-between py-4">
						<li>
							<Link to="/" className="text-xl p-4">
								<FontAwesomeIcon icon={faHome} />
							</Link>
						</li>
						<li>
							<Link
								className="text-xl p-4"
								onClick={(e) => {
									if (!loggedInUser) return;

									e.preventDefault();

									modalUpdate({
										title: 'Confirm logout',
										content: <p>Are you sure you want to log out?</p>,
										footer: (
											<div className="flex gap-4">
												<Button.Primary
													onClick={() => {
														modalToggle(false);
													}}
												>
													No
												</Button.Primary>
												<Button.Danger
													onClick={() => {
														logout(() => navigate('/login'));

														modalToggle(false);
													}}
												>
													Yes
												</Button.Danger>
											</div>
										)
									});

									modalToggle(true);
								}}
								to="/login"
								title={loggedInUser ? 'Logout' : 'Login'}
							>
								{loggedInUser ? (
									<FontAwesomeIcon icon={faRightFromBracket} />
								) : (
									<FontAwesomeIcon icon={faRightToBracket} />
								)}
							</Link>
						</li>
					</ul>
				</nav>
			</Card>
			<h1 className="text-center">{pageTitle}</h1>
		</>
	);
}
