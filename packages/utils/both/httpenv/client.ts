type ClientEnvironment = {
	backendPort: string;
	backendAddress: string;
	backendEndpoint: string;
};

function calculateClientEnvironment(): ClientEnvironment {
	if (process.env.DOCKER) {
		return {
			backendPort: process.env.PUB_PORT_SSL!,
			backendAddress: `https://${process.env.PUB_HOST}`,
			backendEndpoint: process.env.BACKEND_PUB_ENDPOINT!
		};
	} else {
		return {
			backendPort: process.env.BACKEND_DEV_PORT!,
			backendAddress: `http://${process.env.PUB_DEV_HOST}`,
			backendEndpoint: process.env.PUB_DEV_ENDPOINT!
		};
	}
}

export const clientEnvironment = calculateClientEnvironment();
