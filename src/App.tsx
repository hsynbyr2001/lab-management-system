import { Paper } from '@mantine/core';
import './App.css'
import ReportCreate from './components/ReportCreate'
import ReportList from './components/ReportList'
import '@mantine/core/styles.css';

function App() {

  return (
    <div>
      <Paper color='gray' shadow="lg" radius="lg" m="150" bg="#f0f0f0">
        <ReportCreate />
        <ReportList />
      </Paper>
    </div>
  )
}

export default App
