import './index.css'

const EmploymentType = props => {
  const {EmploymentTypeDetail} = props
  const {label, employmentTypeId} = EmploymentTypeDetail
  return (
    <li className="list-itemm">
      <input type="checkbox" id={employmentTypeId} />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentType
