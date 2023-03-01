import './index.css'

const SkillItem = props => {
  const {skillData} = props
  const {name, ImageUrl} = skillData
  return (
    <li>
      <img src={ImageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default SkillItem
