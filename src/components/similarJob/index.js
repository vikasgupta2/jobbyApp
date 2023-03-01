import './index.css'

const SimilarJob = props => {
  const {similarJobDetail} = props
  const {
    titleSimilar,
    companyLogoUrlSimilar,
    employmentTypeSimilar,
    locationSimilar,
    jobDescriptionSimilar,
    ratingSimilar,
  } = similarJobDetail
  return (
    <li className="">
      <div className="first-card">
        <img
          className="img-job"
          src={companyLogoUrlSimilar}
          alt="similar job company logo"
        />

        <div className="first-inner-card">
          <h1>{titleSimilar}</h1>
          <p>{ratingSimilar}</p>
        </div>
      </div>
      <div className="second-card">
        <div className="second-inner-card">
          <p>{locationSimilar}</p>
          <p>{employmentTypeSimilar}</p>
        </div>
      </div>
      <hr className="line" />
      <div className="third-card">
        <h1>Description</h1>
        <p>{jobDescriptionSimilar}</p>
      </div>
    </li>
  )
}

export default SimilarJob
