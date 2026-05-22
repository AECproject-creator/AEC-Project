import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <main className="error-shell">
          <div className="error-panel">
            <p className="kicker">SYSTEM WARNING</p>
            <h1>RENDER ERROR</h1>
            <p>サイト演出の一部でエラーが発生しました。再読み込みするか、演出を軽量化してください。</p>
            <pre>{String(this.state.error?.message || this.state.error)}</pre>
            <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>再起動</button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
