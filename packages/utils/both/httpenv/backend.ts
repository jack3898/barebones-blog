import { rootenv } from '@blog/utils/node/rootenv';

rootenv();

type BackendEnvironment = {
	publicAddr: string;
	publicPort: string;
	publicEndpoint: string;
	backendInternalPort: string;
};

function calculateBackendEnvironment(): BackendEnvironment {
	if (process.env.DOCKER) {
		return {
			publicAddr: `https://${process.env.PUB_HOST}`,
			publicPort: process.env.PUB_PORT!,
			publicEndpoint: process.env.BACKEND_PUB_ENDPOINT!,
			backendInternalPort: process.env.BACKEND_INT_PORT!
		};
	} else {
		return {
			publicAddr: `http://${process.env.PUB_DEV_HOST}`,
			publicPort: process.env.CLIENT_DEV_PORT!,
			publicEndpoint: process.env.PUB_DEV_ENDPOINT!,
			backendInternalPort: process.env.BACKEND_DEV_PORT!
		};
	}
}

export const backendEnvironment = calculateBackendEnvironment();
