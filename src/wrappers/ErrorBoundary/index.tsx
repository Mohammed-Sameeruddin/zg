import { Box } from '@mui/material';
import * as React from 'react';

interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<any> {
  public readonly state: Readonly<IState> = {
    hasError: false,
  };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    //render error message or widget below
    return hasError ? (
      <Box
        position="absolute"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      ></Box>
    ) : (
      children
    );
  }
}
