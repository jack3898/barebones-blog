import { createContext, useState } from 'react';

type ModalContextProviderProps = {
	children: React.ReactNode;
};

const defaultModalContent = {
	show: false,
	title: '',
	content: <></>,
	footer: <></>,
	onDismiss: () => {}
};

type ModalContent = typeof defaultModalContent;

type ModalContext = {
	modalVisible: boolean;
	modalToggle: (state: boolean) => void;
	modalUpdate: (newContent: Partial<ModalContent>) => ModalContent;
	modalContent: ModalContent;
};

export const ModalContext = createContext<ModalContext>({
	modalVisible: false,
	modalToggle: (state: boolean) => {},
	modalUpdate: (newContent: Partial<ModalContent>) => newContent as ModalContent,
	modalContent: defaultModalContent
});

export function ModalProvider({ children }: ModalContextProviderProps) {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState<ModalContent>(defaultModalContent);

	const toggleVisible = (state: boolean) => {
		const newVisibility = !visible;

		if (!newVisibility) {
			content.onDismiss();

			setContent(defaultModalContent);
		}

		setVisible(state);
	};

	const updateModal = (newContent: Partial<ModalContent>) => {
		const updatedContent = { ...defaultModalContent, ...newContent };

		setContent(updatedContent);

		return updatedContent;
	};

	return (
		<ModalContext.Provider
			value={{
				modalVisible: visible,
				modalToggle: toggleVisible,
				modalUpdate: updateModal,
				modalContent: content
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
