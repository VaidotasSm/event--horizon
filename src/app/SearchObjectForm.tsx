'use client';

import { Button, FormControl, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

export const SearchObjectForm: React.FC<{ initialId: string; initialType?: string }> = (props) => {
  const [id, setId] = useState(props.initialId || '');
  const [type, setType] = useState(props.initialType || '');

  const handleIdChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const handleTypeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setType(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, mt: 5, width: '100%' }} variant="outlined">
      <TextField name="id" label="Object ID" value={id} onChange={handleIdChange} />
      <TextField name="type" label="Object Type" value={type} onChange={handleTypeChange} />

      <Button type="submit" fullWidth variant="contained" color="primary">
        Search
      </Button>
    </FormControl>
  );
};
