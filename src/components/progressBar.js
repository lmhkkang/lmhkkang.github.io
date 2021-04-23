import React, { useEffect, useState } from "react"
import styled from "styled-components"

const StyledProgressBar = styled.div`
  .progress-container {
    position: relative;
    top: -2px;
    width: 100%;
    height: 2px;
  }
  .progress-bar {
    width: 0%;
    height: 2px;
    background: #333;
    -webkit-transition: width 0.2s ease-out; /* Safari */
    transition: width 0.2s ease-out;
  }

  @media only screen and (max-width: 1024px) {
    .service_header.article .wrap_cover_type {
      display: none;
    }
  }
`

const ProgressBar = () => {
  const [progressBarWidth, setProgressBarWidth] = useState(0)

  useEffect(() => {
    window.onscroll = e => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scroll = `${(totalScroll / windowHeight) * 100}`

      setProgressBarWidth(scroll)
    }
  })

  return (
    <StyledProgressBar>
      <div className="progress-container">
        <div
          className="progress-bar"
          id="progressBar"
          style={{ width: progressBarWidth + "%" }}
        />
      </div>
    </StyledProgressBar>
  )
}

export default ProgressBar
