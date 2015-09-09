import React, { Component, PropTypes } from "react"
import ErrorStackParser from "error-stack-parser"

class RedBox extends Component {

  static propTypes = {
    error: PropTypes.instanceOf(Error).isRequired
  }

  render () {
    const { error } = this.props
    const frames = ErrorStackParser.parse(error).map((f, index) => {
      const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`
      return (
        <div style={styles.frame} key={index}>
          <div>{f.functionName}</div>
          <div style={styles.file}>
            <a href={link} style={styles.link}>{link}</a>
          </div>
        </div>
      )
    })
    return (
      <div style={styles.redbox}>
        <div style={styles.message}>{error.name}: {error.message}</div>
        <div style={styles.stack}>{frames}</div>
      </div>
    )
  }
}

const styles = {
  redbox: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    fontSize: "1rem",
    position: "fixed",
    padding: "1rem",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgb(204, 0, 0)",
    color: "white",
    zIndex: 10000,
  },
  message: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    fontWeight: 700,
  },
  stack: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Menlo, Consolas, monospace",
    marginTop: "2rem",
  },
  frame: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  file: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.8rem",
    color: "rgba(255, 255, 255, 0.7)",
  },
  link: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.7)",
  },
}

export default RedBox
