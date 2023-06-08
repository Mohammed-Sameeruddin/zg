import { Button } from '@mui/material';
import { SharedMap } from 'fluid-framework';
import React, { useEffect, useState } from 'react';

interface ISharedMap {
  sharedMap: SharedMap;
}

const SharedMapDemo = (sharedMap: ISharedMap) => {
  const map: ISharedMap = sharedMap;

  const [label, setLabel] = useState<String>('0');
  const [list, setList] = useState<String[]>([]);

  const handleChange = () => {
    console.log('Clicked');
    map.sharedMap.set('label', Math.floor(Math.random() * 100));
  };

  const updateLabel = () => {
    const text = map.sharedMap.get('label');
    setLabel(text);
    setList((prev) => {
      if (!prev.includes(text)) {
        return [...prev, text];
      }
      return prev;
    });
  };

  map.sharedMap.on('valueChanged', updateLabel);

  useEffect(() => {
    updateLabel();
  }, []);

  return (
    <>
      <h2>Shared Map Demo</h2>
      <h4>{label}</h4>
      <Button variant="outlined" onClick={handleChange}>
        Change Label
      </Button>
      {list?.map((item) => {
        return <li>{item}</li>;
      })}
    </>
  );
};

export default SharedMapDemo;
