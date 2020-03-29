import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { register } from 'register-service-worker';

export interface ServiceWorkerNotificationProps {
  swPath?: string;
}

const DEFAULT_SW_PATH = '/service-worker.js';

export const ServiceWorkerNotification: React.FC<ServiceWorkerNotificationProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const swPath = props.swPath ? props.swPath : DEFAULT_SW_PATH;

  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      register(swPath, {
        ready(registration) {},
        registered(registration) {
          setRegistered(true);
        },
        cached(registration) {
          enqueueSnackbar('Content has been cached for offline use.', { variant: 'success' });
        },
        updatefound(registration) {
          enqueueSnackbar('New content is downloading.', { variant: 'success' });
        },
        updated(registration) {
          enqueueSnackbar('New content is available.', {
            variant: 'success',
            action: () => {
              return (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    location.reload();
                  }}
                >
                  Refresh
                </Button>
              );
            },
          });
        },
        offline() {
          enqueueSnackbar('No internet connection found. App is running in offline mode.', {
            variant: 'success',
          });
        },
        error(error) {
          enqueueSnackbar('Error during service worker registration:' + error, {
            variant: 'error',
          });
        },
      });
    }
  }, [registered]);

  return <React.Fragment />;
};
