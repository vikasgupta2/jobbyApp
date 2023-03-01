import {Link} from 'react-router-dom'
import './index.css'
import Header from '../header'

const Home = () => (
  <>
    <Header />
    <div className="main-container-home">
      <div>
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jobs that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
