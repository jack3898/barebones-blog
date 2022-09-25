import { useModal } from './useModal';

export function Modal() {
	const { modalVisible, modalToggle, modalContent } = useModal();

	if (!modalVisible) return null;

	return (
		<div className="fixed z-50 top-0 right-0 bottom-0 left-0 grid place-items-center">
			<div
				onClick={() => modalToggle(false)}
				className="bg-black bg-opacity-50 backdrop-blur-sm col-start-1 col-end-[-1] row-start-1 row-end-[-1] w-full h-full"
			/>
			<div className="grid place-items-center col-start-1 col-end-[-1] row-start-1 row-end-[-1] z-[51] p-4">
				<article className="bg-white rounded w-screen max-w-2xl grid gap-4">
					<header className="p-4">
						<h2>{modalContent.title}</h2>
					</header>
					<div className="p-4">{modalContent.content}</div>
					<footer className="p-4">{modalContent.footer}</footer>
				</article>
			</div>
		</div>
	);
}
