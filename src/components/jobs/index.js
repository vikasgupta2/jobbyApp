import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobCard from '../jobsCard'
import './index.css'
import Header from '../header'
import EmploymentType from '../employementType'
import SalaryType from '../salaryType'
import Failure from '../failure'

// import {Switch} from 'react-router-dom'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantsF = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Job extends Component {
  state = {
    jobsList: [],
    inputValue: '',
    profile: {},
    apiStatus: apiStatusConstants.inProgress,
    apiStatusF: apiStatusConstantsF.inProgress,
  }

  componentDidMount() {
    this.getData()
    this.getProfileData()
  }

  getValue = event => {
    this.setState({inputValue: event.target.value})
    this.getData()
  }

  filteredList = async () => {
    const {inputValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiurl = `https://apis.ccbp.in/jobs/?serch=${inputValue}`
      const options = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      const response = await fetch(apiurl, options)
      if (response.ok === true) {
        const data = await response.json()
        const convertedData = data.jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          title: eachItem.title,
        }))

        const filterList = convertedData.filter(eachListItem =>
          eachListItem.title.toLowerCase().includes(inputValue.toLowerCase()),
        )

        if (filterList.length !== 0) {
          console.log('lenth is not zero')
          this.setState({
            jobsList: filterList,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          console.log('length is zero')
          this.setState({apiStatus: apiStatusConstants.failure})
        }
      } else {
        console.log('failure is zero')
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiurl = 'https://apis.ccbp.in/jobs/'
      const options = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      const response = await fetch(apiurl, options)
      if (response.ok === true) {
        const data = await response.json()
        const convertedData = data.jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          title: eachItem.title,
        }))
        if (convertedData.length !== 0) {
          console.log('lenth is not zero')
          this.setState({
            jobsList: convertedData,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          console.log('length is zero')
          this.setState({apiStatus: apiStatusConstants.failure})
        }
      } else {
        console.log('failure is zero')
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiurl1 = 'https://apis.ccbp.in/profile'
      const options1 = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      const response1 = await fetch(apiurl1, options1)
      if (response1.ok === true) {
        const data1 = await response1.json()
        const profile = data1.profile_details
        const convertedData1 = {
          name: profile.name,
          profileImageUrl: profile.profile_image_url,
          shortBio: profile.short_bio,
        }
        this.setState({
          profile: convertedData1,
          apiStatusF: apiStatusConstantsF.success,
        })
      } else {
        this.setState({apiStatusF: apiStatusConstantsF.failure})
      }
    }
  }

  renderProductsListView = () => {
    const {jobsList} = this.state
    return (
      <div className="second-column">
        <div className="search-bar">
          <input
            id="input-ele"
            onChange={this.getValue}
            placeholder="Search"
            type="search"
          />
          <button
            onClick={this.filteredList}
            type="button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul>
          {jobsList.map(eachCard => (
            <JobCard key={eachCard.id} cardDetails={eachCard} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderFailureView = () => <Failure ApiAgain={this.getData} />

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderProductsListViewF = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="first-column">
        <div className="profile-contain">
          <img src={profileImageUrl} alt="profile" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachItemm => (
            <EmploymentType
              key={eachItemm.employmentTypeId}
              EmploymentTypeDetail={eachItemm}
            />
          ))}
        </ul>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachItemmm => (
            <SalaryType
              key={eachItemmm.salaryRangeId}
              SalaryRangeDetail={eachItemmm}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingViewF = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderFailureViewF = () => (
    <button onClick={this.getProfileData} type="button">
      Retry
    </button>
  )

  renderAllProductsF = () => {
    const {apiStatusF} = this.state
    switch (apiStatusF) {
      case apiStatusConstantsF.success:
        return this.renderProductsListViewF()
      case apiStatusConstantsF.failure:
        return this.renderFailureViewF()
      case apiStatusConstantsF.inProgress:
        return this.renderLoadingViewF()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="main-container-job">
          {this.renderAllProductsF()}
          {this.renderAllProducts()}
        </div>
      </div>
    )
  }
}

export default Job
