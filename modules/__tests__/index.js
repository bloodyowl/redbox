import React from "react"
import RedBox from ".."
import tape from "tape-catch"

tape("RedBox", (test) => {
  test.doesNotThrow(() => {
    React.render(
      <RedBox error={new Error("Hello")}/>,
      document.createElement("div")
    )
  })
  test.end()
})
