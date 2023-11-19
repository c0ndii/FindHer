import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Welcome } from './routes/Welcome'
import { Layout } from "./components/Layout";
import { AccountView } from "./view/AccountView";
import { PreferencesView } from "./view/PreferencesView";
import { InterestsView } from "./view/InterestsView";
import { SettingsView } from "./view/SettingsView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/SignIn" element={<Welcome />} />
        <Route path="/app" element={<Layout />}>
          <Route path="Account" element={<AccountView />}/>
          <Route path="Preferences" element={<PreferencesView />}/>
          <Route path="Interests" element={<InterestsView />}/>
          <Route path="Settings" element={<SettingsView />}/>
        </Route>
    </Routes>
  )
};

export default App;
