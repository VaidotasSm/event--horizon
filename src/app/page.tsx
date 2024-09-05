'use client';

import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  // Button click handler
  const handleClickSearch = () => {
    const inputElement = document.getElementById('search-bar') as HTMLInputElement;
    console.log(inputElement.value);
  };

  // Input change handler
  const handleSearchChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, mt: 5, width: '100%' }} variant="outlined">
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
    </>
  );
}
