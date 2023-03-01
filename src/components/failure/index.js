import './index.css'
import {withRouter} from 'react-router-dom'
// import Header from '../header'

const Failure = props => {
  const {ApiAgain} = props
  const {match} = props
  const {params} = match
  const {id} = params

  const getApiAgain = () => {
    ApiAgain(id)
  }

  return (
    <>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button" onClick={getApiAgain}>
          Retry
        </button>
      </div>
    </>
  )
}
export default withRouter(Failure)
