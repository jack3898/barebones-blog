import { Column } from '@blog/components/layout';
import { Header } from 'src/components';
import { LoginForm } from './components/LoginForm';

export default function Login() {
	return <Column header={<Header pageTitle="Login" />} main={<LoginForm />} footer={null} />;
}
