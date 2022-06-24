import { Component, ReactNode } from "react";
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    errorMessage: "",
  };

  public componentDidCatch = (error, info) => {
    console.log("was here");
    this.setState({ hasError: true, errorMessage: error });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <h1
          style={{
            lineHeight: "100vh",
            textAlign: "center",
          }}>
          Something went Wrong Please try again later
        </h1>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
