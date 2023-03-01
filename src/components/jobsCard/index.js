import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {cardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = cardDetails

  return (
    <div>
      <Link to={`/jobs/${id}`} className="job-card">
        <li>
          <div className="first-card">
            <img className="img-job" src={companyLogoUrl} alt="company logo" />
            <div className="first-inner-card">
              <h1>{title}</h1>
              <p>{rating}</p>
            </div>
          </div>
          <div className="second-card">
            <div className="second-inner-card">
              <p>{location}</p>
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="third-card">
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    </div>
  )
}

export default JobCard
