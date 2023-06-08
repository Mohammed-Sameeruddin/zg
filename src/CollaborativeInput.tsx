import { SharedStringHelper } from '@fluid-experimental/react-inputs';
import TinyliciousClient from '@fluidframework/tinylicious-client';
import {
  ConnectionState,
  ContainerSchema,
  IFluidContainer,
  SharedString,
} from 'fluid-framework';
import React, { useEffect, useState } from 'react';

interface ICollaborativeTextAreaProps {
  sharedStringHelper: SharedStringHelper;
}

const CollaborativeInput = (props: ICollaborativeTextAreaProps) => {
  const sharedStringHelper = props.sharedStringHelper;

  const [text, setText] = React.useState<string>(sharedStringHelper.getText());

  const handleChange = (event: any) => {
    const newText = event.target.value;
    setText(newText);
    sharedStringHelper.insertText('Hello', 1);
  };

  return (
    <div>
      <h2>Collaborative Input Field</h2>
      <input type="text" value={text} onChange={handleChange} />
    </div>
  );
};

export default CollaborativeInput;
