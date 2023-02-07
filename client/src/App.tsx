import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { Header } from './features/header/Header';
import { Todo } from './features/todo/Todo';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[900],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Todo />
    </ThemeProvider>
  );
}

export default App;
