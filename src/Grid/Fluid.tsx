import React from 'react';
import { useState, useEffect } from 'react';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import {
  ConnectionState,
  ContainerSchema,
  IFluidContainer,
  SharedMap,
  SharedString,
} from 'fluid-framework';
import MyDataGrid from './Grid';

const useSharedMap = (): SharedMap => {
  const [sharedMap, setSharedMap] = useState<SharedMap>();

  const getFluidData = async () => {
    // TODO 1: Configure the container.

    const client: TinyliciousClient = new TinyliciousClient();
    const containerSchema: ContainerSchema = {
      initialObjects: { customMap: SharedMap },
    };

    // TODO 2: Get the container from the Fluid service.
    let container: IFluidContainer;
    const containerId = window.location.hash.substring(1);
    if (!containerId) {
      ({ container } = await client.createContainer(containerSchema));
      const id = await container.attach();
      window.location.hash = id;
      // Return the Fluid SharedString object.
      return container.initialObjects.customMap as SharedMap;
    }

    ({ container } = await client.getContainer(containerId, containerSchema));
    if (container.connectionState !== ConnectionState.Connected) {
      await new Promise<void>((resolve) => {
        container.once('connected', () => {
          resolve();
        });
      });
    }

    // TODO 3: Return the Fluid SharedString object.
    return container.initialObjects.customMap as SharedMap;
  };

  // TODO 4: Get the Fluid Data data on app startup and store in the state.
  useEffect(() => {
    getFluidData().then((data) => setSharedMap(data));
  }, []);

  // TODO 5: Return the SharedString Object
  return sharedMap as SharedMap;
};

const FluidMap = () => {
  const sharedMap = useSharedMap(); // getting the fluid data using custom hook created above

  if (sharedMap) {
    return (
      <div className="app">
        <MyDataGrid sharedMap={sharedMap} />
      </div>
    );
  } else {
    return <div />;
  }
};

export default FluidMap;
