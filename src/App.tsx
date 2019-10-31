import * as React from 'react';
import './App.css';
import { NavView, nav,start } from 'tonva';
import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
import { appConfig } from 'configuration';

//const tonvaApp = "bruce/TestApp";
nav.setSettings(appConfig);

class App extends React.Component {

  private onLogined = async () => {
    await start(CPaperDocMgtApp, appConfig);
  }
  public render() {
    return <NavView onLogined={this.onLogined} notLogined={this.onLogined} />
  }
}

export default App;