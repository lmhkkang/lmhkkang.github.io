import React, { useState, useEffect, useContext, useRef } from "react"
import styled from "styled-components"
import SkeletonLoader from "tiny-skeleton-loader-react"
import { motion, useAnimation } from "framer-motion"

import Context from "../../context"
import ContentWrapper from "../../styles/contentWrapper"
import Underlining from "../../styles/underlining"
import { mediumRssFeed, shownArticles } from "../../../config"
// import { rssFeed, shownArticles } from "../../../config"
import { lightTheme, darkTheme } from "../../styles/theme"
import PROJECTS from "../../../content/myprojects/projects"
import { isMobile } from "../../utils/index"

const StyledSection = motion.custom(styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`)

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
    .articles {
      display: flex;
      justify-content: flex-start;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      margin: -2rem 0 0 0;
      padding: 0 2rem;
      &::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        padding: 0 1rem;
      }
      /* Show scrollbar if desktop and wrapper width > viewport width */
      @media (hover: hover) {
        scrollbar-color: ${({ theme }) => theme.colors.scrollBar} transparent; // Firefox only
        &::-webkit-scrollbar {
          display: block;
          -webkit-appearance: none;
        }

        &::-webkit-scrollbar:horizontal {
          height: 0.8rem;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          border: 0.2rem solid ${({ theme }) => theme.colors.background};
          background-color: ${({ theme }) => theme.colors.scrollBar};
        }

        &::-webkit-scrollbar-track {
          background-color: ${({ theme }) => theme.colors.background};
          border-radius: 8px;
        }
      }
    }
    .card {
      width: 16.25rem;
      height: 12rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      margin: 2rem 1rem;
      box-shadow: 0 5px 15px ${({ theme }) => theme.colors.boxShadow};
      border-radius: ${({ theme }) => theme.borderRadius};
      background: ${({ theme }) => theme.colors.card};
      transition: box-shadow 0.3s ease-out;
      &:hover {
        box-shadow: 0 5px 15px ${({ theme }) => theme.colors.boxShadowHover};
      }
      &:hover ${Underlining} {
        box-shadow: inset 0 -1rem 0 ${({ theme }) => theme.colors.secondary};
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        margin: 2rem 2.5rem 2rem 0;
      }
      .category {
        color: ${({ theme }) => theme.colors.primary};
        text-transform: uppercase;
        letter-spacing: +1px;
        font-weight: 700;
      }
      .title {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      }
      .date {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.subtext};
        letter-spacing: +0.5px;
        line-height: 17px;
      }
      .lpad10 {
        padding-left: 10px;
      }
      .txt-center {
        text-align: center;
      }
      .dpad10 {
        padding: 0 0 10px 0;
      }
      .dark-gray {
        color: darkgray;
      }
    }
  }
`

const MyProjects = () => {
  const MAX_ARTICLES = shownArticles
  const el = useRef()
  const { isIntroDone, darkMode } = useContext(Context).state
  const [projects, setProjects] = useState()
  const articlesControls = useAnimation()
  const [isMobi, setIsMobi] = useState(false)

  const loadArticles = async () => {
    if (isIntroDone) {
      await articlesControls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 1 },
      })

      setTimeout(() => {
        setProjects(PROJECTS)
      }, 1000)
      /*
      fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
        // fetch(rssFeed, { headers: { Accept: "application/json" } })
        .then(res => res.json())
        // Feed also contains comments, therefore we filter for articles only
        .then(data => data.items.filter(item => item.categories.length > 0))
        // .then(data => data.items.filter(item => item.title.length > 0))
        .then(newArticles => newArticles.slice(0, MAX_ARTICLES))
        .then(articles => setArticles(articles))
        .catch(error => console.log(error))
        */
    }
  }

  const xScrollFunc = e => {
    if (isMobile()) return
    document.body.style.overflow = "hidden"
    if (e.deltaY < 0) {
      el.current.scrollBy({ top: 0, left: -200, behavior: "smooth" })
    } else {
      el.current.scrollBy({ top: 0, left: +200, behavior: "smooth" })
    }
  }

  const ableScroll = () => {
    if (isMobile()) return
    document.body.style.overflow = null
  }

  // Load and display articles after the splashScreen sequence is done
  useEffect(() => {
    loadArticles()
    if (isMobile()) setIsMobi(isMobile())
  }, [isIntroDone, articlesControls, MAX_ARTICLES])

  return (
    <StyledSection
      id="articles"
      initial={{ opacity: 0, y: 20 }}
      animate={articlesControls}
    >
      <StyledContentWrapper>
        <h3 className="section-title">My Projects</h3>
        <div
          className="articles"
          onWheel={xScrollFunc}
          onMouseLeave={ableScroll}
          ref={el}
          style={isMobi ? { overflowX: "scroll" } : { overflowX: "hidden" }}
        >
          {projects
            ? projects.map(item => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  title={item.title}
                  aria-label={item.link}
                  key={item.link}
                >
                  <div className="card">
                    <span className="category txt-center dpad10">
                      <Underlining color="tertiary" hoverColor="secondary">
                        {item.projectTitle}
                      </Underlining>
                    </span>
                    <span className="date lpad10 dpad10 txt-center dark-gray">
                      {item.duration}
                    </span>

                    <span className="date lpad10">
                      <b>frontend</b> - {item.frontend}
                    </span>
                    <span className="date lpad10">
                      <b>backend</b> - {item.backend}
                    </span>
                    <span className="date lpad10">
                      <b>infra</b> - {item.infra}
                    </span>
                    <span className="date lpad10">
                      <b>CM</b> - {item.cm}
                    </span>
                    <span className="date lpad10">
                      <b>role</b> - {item.myjob}
                    </span>
                  </div>
                </a>
              ))
            : [...Array(MAX_ARTICLES <= 3 ? MAX_ARTICLES : 3)].map((i, key) => (
                <div className="card" key={key}>
                  <SkeletonLoader
                    height="1.5rem"
                    style={{ marginBottom: ".5rem" }}
                    background={
                      darkMode
                        ? darkTheme.colors.tertiary
                        : lightTheme.colors.tertiary
                    }
                  />
                  <SkeletonLoader
                    height="4rem"
                    background={
                      darkMode
                        ? darkTheme.colors.tertiary
                        : lightTheme.colors.tertiary
                    }
                  />
                  <SkeletonLoader
                    height=".75rem"
                    width="50%"
                    style={{ marginTop: ".5rem" }}
                    background={
                      darkMode
                        ? darkTheme.colors.tertiary
                        : lightTheme.colors.tertiary
                    }
                  />
                </div>
              ))}
        </div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default MyProjects
