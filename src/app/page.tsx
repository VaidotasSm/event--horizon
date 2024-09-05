'use client';

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const handleClickSearch = () => {
    console.log('search');
  };

  const handleSearchChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
        <InputLabel htmlFor="search-bar">Search</InputLabel>
        <OutlinedInput
          id="search-bar"
          type="text"
          onChange={handleSearchChnage}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Search" onClick={handleClickSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
    </main>
  );
}
