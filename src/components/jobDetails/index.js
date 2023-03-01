import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SkillItem from '../skillItem'
import Header from '../header'
import SimilarJob from '../similarJob'
import Failure from '../failure'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetail extends Component {
  state = {
    jobDetails: {},
    similarJob: [],
    skills: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllDataClone = async id => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const url = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {Authorization: `Bearer: ${jwtToken}`},
        method: 'GET',
      }
      const responseData = await fetch(url, options)
      if (responseData.ok === true) {
        const jobdata = await responseData.json()
        const jobdata1 = jobdata.job_details
        const convertedDataJob = {
          companyLogoUrl: jobdata1.company_logo_url,
          employmentType: jobdata1.employment_type,
          id: jobdata1.id,
          jobDescription: jobdata1.job_description,
          location: jobdata1.location,
          packagePerAnnum: jobdata1.package_per_annum,
          rating: jobdata1.rating,
          title: jobdata1.title,
          companyWebsiteUrl: jobdata1.company_website_url,
          lifeAtCompany: jobdata1.life_at_company,
          skills: jobdata1.skills,
        }
        const {skills, lifeAtCompany} = convertedDataJob
        const convertedSkills = skills.map(eachSkillItem => ({
          name: eachSkillItem.name,
          ImageUrl: eachSkillItem.image_url,
        }))
        const newlifeAtCompany = {
          description: lifeAtCompany.description,
          desImageUrl: lifeAtCompany.image_url,
        }
        const similarJobs = jobdata.similar_jobs
        const convertedSimilarJob = similarJobs.map(eachSkillItem => ({
          companyLogoUrlSimilar: eachSkillItem.company_logo_url,
          employmentTypeSimilar: eachSkillItem.employment_type,
          id: eachSkillItem.id,
          jobDescriptionSimilar: eachSkillItem.job_description,
          locationSimilar: eachSkillItem.location,
          ratingSimilar: eachSkillItem.rating,
          titleSimilar: eachSkillItem.title,
        }))

        this.setState({
          jobDetails: convertedDataJob,
          similarJob: convertedSimilarJob,
          skills: convertedSkills,
          lifeAtCompany: newlifeAtCompany,
          apiStatus: apiStatusConstants.success,
        })
      } else if (responseData.status === 400) {
        console.log('i m fetcing')
        this.setState({apiStatus: apiStatusConstants.failure})
      } else {
        this.setState({apiStatus: apiStatusConstants.inProgress})
      }
    }
  }

  getAllData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    if (jwtToken !== undefined) {
      const url = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {Authorization: `Bearer: ${jwtToken}`},
        method: 'GET',
      }
      const responseData = await fetch(url, options)
      if (responseData.ok === true) {
        const jobdata = await responseData.json()
        const jobdata1 = jobdata.job_details
        const convertedDataJob = {
          companyLogoUrl: jobdata1.company_logo_url,
          employmentType: jobdata1.employment_type,
          id: jobdata1.id,
          jobDescription: jobdata1.job_description,
          location: jobdata1.location,
          packagePerAnnum: jobdata1.package_per_annum,
          rating: jobdata1.rating,
          title: jobdata1.title,
          companyWebsiteUrl: jobdata1.company_website_url,
          lifeAtCompany: jobdata1.life_at_company,
          skills: jobdata1.skills,
        }
        const {skills, lifeAtCompany} = convertedDataJob
        const convertedSkills = skills.map(eachSkillItem => ({
          name: eachSkillItem.name,
          ImageUrl: eachSkillItem.image_url,
        }))
        const newlifeAtCompany = {
          description: lifeAtCompany.description,
          desImageUrl: lifeAtCompany.image_url,
        }
        const similarJobs = jobdata.similar_jobs
        const convertedSimilarJob = similarJobs.map(eachSkillItem => ({
          companyLogoUrlSimilar: eachSkillItem.company_logo_url,
          employmentTypeSimilar: eachSkillItem.employment_type,
          id: eachSkillItem.id,
          jobDescriptionSimilar: eachSkillItem.job_description,
          locationSimilar: eachSkillItem.location,
          ratingSimilar: eachSkillItem.rating,
          titleSimilar: eachSkillItem.title,
        }))

        this.setState({
          jobDetails: convertedDataJob,
          similarJob: convertedSimilarJob,
          skills: convertedSkills,
          lifeAtCompany: newlifeAtCompany,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJob, skills, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      companyWebsiteUrl,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, desImageUrl} = lifeAtCompany
    return (
      <div data-testid="loader">
        <Header />
        <div className="main-conti" data-testid="loader">
          <div>
            <div className="first-card">
              <img
                className="img-job"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="first-inner-card">
                <p>{title}</p>
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
              <a href={companyWebsiteUrl}>Visit</a>
              <p>{jobDescription}</p>
            </div>
            <div>
              <h1>Skills</h1>
              <ul className="items">
                {skills.map(eachItem => (
                  <SkillItem key={eachItem.name} skillData={eachItem} />
                ))}
              </ul>
            </div>
            <div className="life-at">
              <div>
                <h1>Life at Company</h1>
                <p>{description}</p>
              </div>
              <img src={desImageUrl} alt="life at company" />
            </div>
          </div>
          <div>
            <h1>Similar Jobs</h1>
            <ul>
              {similarJob.map(eachSimilarJob => (
                <SimilarJob
                  key={eachSimilarJob.id}
                  similarJobDetail={eachSimilarJob}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#000000" height="50" width="50" />
      </div>
    </>
  )

  renderFailureView = () => <Failure ApiAgain={this.getAllDataClone} />

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default JobDetail
