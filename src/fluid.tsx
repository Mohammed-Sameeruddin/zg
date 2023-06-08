import React from 'react';
import { useState, useEffect } from 'react';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import {
  ConnectionState,
  ContainerSchema,
  IFluidContainer,
  SharedString,
} from 'fluid-framework';
import { CollaborativeTextArea } from './CollaborativeTextArea';
import { SharedStringHelper } from '@fluid-experimental/react-inputs';

const useSharedString = (): SharedString => {
  const [sharedString, setSharedString] = useState<SharedString>();

  const getFluidData = async () => {
    // TODO 1: Configure the container.

    const client: TinyliciousClient = new TinyliciousClient();
    const containerSchema: ContainerSchema = {
      initialObjects: { sharedString: SharedString },
    };

    // TODO 2: Get the container from the Fluid service.
    let container: IFluidContainer;
    const containerId = window.location.hash.substring(1);
    if (!containerId) {
      ({ container } = await client.createContainer(containerSchema));
      const id = await container.attach();
      window.location.hash = id;
      // Return the Fluid SharedString object.
      return container.initialObjects.sharedString as SharedString;
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
    return container.initialObjects.sharedString as SharedString;
  };

  // TODO 4: Get the Fluid Data data on app startup and store in the state.
  useEffect(() => {
    getFluidData().then((data) => setSharedString(data));
  }, []);

  // TODO 5: Return the SharedString Object
  return sharedString as SharedString;
};

const Fluid = () => {
  const sharedString = useSharedString(); // getting the fluid data using custom hook created above

  if (sharedString) {
    return (
      <div className="app">
        <CollaborativeTextArea
          sharedStringHelper={new SharedStringHelper(sharedString)}
        />
      </div>
    );
  } else {
    return <div />;
  }
};

export default Fluid;
