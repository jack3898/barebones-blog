import { Column } from '@blog/components/layout';
import { Header } from 'src/components';
import { SignupForm } from './components/SignupForm';

export default function Signup() {
	return <Column header={<Header pageTitle="Sign up" />} main={<SignupForm />} footer={<></>} />;
}
