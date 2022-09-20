import React from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownProps = React.ComponentProps<typeof ReactMarkdown>;

export function Markdown(props: MarkdownProps) {
	return (
		<ReactMarkdown
			components={{
				h1: 'h2',
				h2: 'h3',
				h3: 'h4',
				h4: 'h5',
				h5: 'h6',
				h6: 'h6',
				img: ({ node, ...props }) => (
					<img className="max-h-96 w-full object-contain bg-gray-100 p-2" {...props} />
				),
				ul: ({ node, ...props }) => <ul className="pl-6 list-disc" {...props} />,
				ol: ({ node, ...props }) => <ul className="pl-6 list-decimal" {...props} />
			}}
			{...props}
		>
			{props.children}
		</ReactMarkdown>
	);
}
