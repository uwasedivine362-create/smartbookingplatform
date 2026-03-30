import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Error boundary caught an error
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          textAlign: "center",
          padding: "4rem 2rem",
          maxWidth: 600,
          margin: "0 auto",
        }}>
          <p style={{ fontSize: "3rem", margin: 0 }}>❌</p>
          <h2 style={{ marginTop: "1rem" }}>Something went wrong</h2>
          <p style={{ color: "#888", marginBottom: "1.5rem" }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <details style={{ textAlign: "left", background: "#f5f5f5", padding: "1rem", borderRadius: 8, marginBottom: "1.5rem" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>Error Details</summary>
            <pre style={{ marginTop: "0.8rem", fontSize: "0.8rem", overflow: "auto" }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#FF5A5F",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
