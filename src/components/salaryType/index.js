import './index.css'

const SalaryType = props => {
  const {SalaryRangeDetail} = props
  const {label, salaryRangeId} = SalaryRangeDetail
  return (
    <li className="list-itemm">
      <input type="radio" id={salaryRangeId} />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryType
