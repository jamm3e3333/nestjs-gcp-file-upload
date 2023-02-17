import { createLoader, safeValues, values } from 'configuru';

const loader = createLoader({
  defaultConfigPath: '.env.jsonc',
});

const configSchema = {
  server: {
    port: loader.number('SERVER_PORT'),
    nodeEnv: loader.string('NODE_ENV'),
  },
  gcp: {
    projectId: loader.string.hidden('GCP_PROJECT_ID'),
    serviceAccount: loader.json.hidden('GCP_SERVICE_ACCOUNT'),
    bucket: {
      name: loader.string.hidden('GCP_FILE_BUCKET_NAME'),
      directories: {
        invoices: 'invoices',
        images: 'images',
      },
    },
  },
};

export default values(configSchema);
export const safeConfig = safeValues(configSchema);
