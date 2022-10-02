import { Column } from '@blog/components/layout';
import { Header } from 'src/components';

export function Profile() {
	return <Column header={<Header pageTitle="Your profile" />} main={<></>} footer={null} />;
}
