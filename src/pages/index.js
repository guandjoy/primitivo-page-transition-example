import React from "react"
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import TransitionEffect from "../components/TransitionEffect"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <TransitionEffect />
      <TransitionLink
        to="/page-2/"
        onClick={() => console.log("clicked")}
        exit={{
          length: 2,
          trigger: ({ exit }) => {
            console.log("exit", exit)
          },
        }}
        entry={{ delay: 0.5, length: 0, state: { layoutTheme: "dark" } }}
      >
        Go to page 2
      </TransitionLink>
    </Layout>
  )
}

export default IndexPage
