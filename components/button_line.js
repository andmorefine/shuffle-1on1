import { useEffect, useState } from 'react'

const ButtonLine = ({ url }) => {

  const [hasScript, setHasScript] = useState(false)
  const [isButtonLoaded, setIsButtonLoaded] = useState(false)

  useEffect(() => {
    const element = document.getElementById('line-it-button')
    const script = document.createElement("script")
    script.src = "https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js"
    script.async = true
    script.defer = true
    if (element) {
      element.appendChild(script)
    }
    typeof LineIt !== 'undefined' ? LineIt.loadButton() : {}
    setHasScript(true)
  }, [])

  useEffect(() => {
    if (typeof LineIt !== 'undefined') {
      LineIt.loadButton()
    }
    setIsButtonLoaded(true)
  }, [hasScript, isButtonLoaded])

  return (
    <>
      <div
        id="line-it-button"
        className="line-it-button"
        data-lang="ja"
        data-type="share-a"
        data-ver="3"
        data-url={url}
        data-color="default"
        data-size="large"
        data-count="false">
      </div>
    </>
  )
}

export default ButtonLine
