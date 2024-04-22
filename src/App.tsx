import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import BrandIcom from './Content/Brand/image004.png'

//import the context
import { ResponseProvider } from './Components/RemoteContext.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ListScreen from './Screens/ListScreen.tsx';
import Home from './Screens/Home.tsx';
import About from './Screens/About.tsx';
import NewBreakdown from './Components/NewBreakdown.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListScreen/>
  },
  {
    path: "/list",
    element: <ListScreen/>
  },
  {
    path: "/about",
    element: <About/>
  }
]);

function App() {
  return (<ResponseProvider>
      <Container fluid>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <img
                  src={BrandIcom}
                  // width="30"
                  height="50"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"/>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <NewBreakdown/>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </Container>
    </ResponseProvider>);
}

export default App;
