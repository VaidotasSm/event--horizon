import { Box, FormControl, InputLabel, TextField } from '@mui/material';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <TextField id="search-bar" label="Search" fullWidth />
    </main>
  );
}
