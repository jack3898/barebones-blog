type ClientEnvironment = {
	backendPort: string;
	backendAddress: string;
	backendEndpoint: string;
};

function calculateClientEnvironment(): ClientEnvironment {
	if (process.env.DOCKER) {
		return {
			backendPort: process.env.PUB_PORT!,
			backendAddress: process.env.PUB_ADDR!,
			backendEndpoint: process.env.BACKEND_PUB_ENDPOINT!
		};
	} else {
		return {
			backendPort: process.env.BACKEND_DEV_PORT!,
			backendAddress: process.env.PUB_DEV_ADDR!,
			backendEndpoint: process.env.PUB_DEV_ENDPOINT!
		};
	}
}

export const clientEnvironment = calculateClientEnvironment();
