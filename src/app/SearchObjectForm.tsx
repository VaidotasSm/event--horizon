'use client';

import { Button, FormControl, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import Grid from '@mui/material/Grid2';

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
      <Grid container spacing={1}>
        <Grid size={6}>
          <TextField
            sx={{ width: '100%' }}
            name="id"
            label="Object ID"
            value={id}
            onChange={handleIdChange}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            sx={{ width: '100%' }}
            name="type"
            label="Object Type"
            value={type}
            onChange={handleTypeChange}
          />
        </Grid>
        <Grid size={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};
