import React, { Component, lazy, Suspense} from 'react';

const About = lazy(() => import(/* webpackChunkName: "about"*/'./About.jsx'));

//ErrorBoundary

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

    static getDerivedStateFromError(error) {
      return {
        hasError: true
      }
    }

  // componentDidCatch() {
  //   console.log('componentDidCatch')
  //   this.setState({
  //     hasError: true
  //   })
  // }

  render() {
    if (this.state.hasError) {
      return <div>error</div>
    }
    return <div>
      <Suspense fallback={<div>Loading</div>}>
        <About></About>
      </Suspense>
    </div>
  }
}

export default App;
