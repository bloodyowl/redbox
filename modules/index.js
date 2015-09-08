import React, { Component, PropTypes } from "react"
import { createStyleSheet, rem } from "stile"
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

const styles = createStyleSheet({
  redbox: {
    fontSize: rem(1),
    position: "fixed",
    padding: rem(1),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgb(204, 0, 0)",
    color: "white",
    zIndex: 10000,
  },
  message: {
    fontWeight: 700,
  },
  stack: {
    fontFamily: "Menlo, Consolas, monospace",
    marginTop: rem(2),
  },
  frame: {
    marginTop: rem(1),
  },
  file: {
    fontSize: rem(0.8),
    color: "rgba(255, 255, 255, 0.7)",
  },
  link: {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.7)",
  },
})

export default RedBox
